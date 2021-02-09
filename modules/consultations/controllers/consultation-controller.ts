import { action, makeObservable, observable } from "mobx";
import io from "socket.io-client";
import axios from "axios";
import { authFetch, EAuthFetch } from "@/services/fetch_services";
import tokenServices from "@/services/token-services";
import validationServices from "@/services/validation-services";
import { injectable } from "inversify";

@injectable()
export default class ConsultationController implements IConsultationController {

    constructor() {
        makeObservable(this);
    }

    // Socket
    socket: SocketIOClient.Socket | null = null;
    peer: Peer | null = null;
    onErrorCb = () => {};
    endCall = () => {};

    setupSocket = async (
        consultationId: string,
        args: {
            onSuccess: (data: any) => any;
            onError: (data: string) => any;
        }
    ): Promise<string> => {
        if (typeof window !== 'undefined') {
            const Peer = await import("peerjs");
        } else return "";

        const userId = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!userId || isUser === null) return "redirect";

        const query = {
            consultationId,
            userId,
            isUser,
            accessToken: localStorage.getItem("accessToken"),
        };

        this.socket = io.connect(process.env.REACT_APP_SERVER_URL ?? "", {
            secure: true,
            query,
            transports: ["websocket"],
        });

        this.socket.on("error", (error: any) => {
            console.log("error!", error);
            args.onError(error);
        });
        this.socket.on("success", async () => {

            console.log("success");

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            this._setVideo("video#user-video", stream);

            let port;
            if (process.env.REACT_APP_PEER_SERVER_PORT != "default") {
                port = parseInt(process.env.REACT_APP_PEER_SERVER_PORT ?? "");
            }

            this.peer = new Peer({
                host: process.env.REACT_APP_PEER_SERVER_URL,
                port: port,
                path: "/mc",
                secure: true,
            });

            this.peer.on("call", (call) => {
                this.partnerConnected = true;
                call.answer(stream);

                call.on("stream", (partnerStream) => {
                    this._setVideo("video#partner-video", partnerStream);
                });

                call.on("error", this.onErrorCb);
            });

            this.peer.on("open", (id) => {
                this.socket?.emit("user-connected", id);
            });

            this.peer.on("error", (err) => {
                console.log(err);
            });

            this.socket?.on("user-connected", (userId: string) => {
                console.log("user-connected", userId);
                this._messages.push({
                    isUser: userId === localStorage.getItem("uid"),
                    type: EMessageType.ConnectMessage,
                    message: "",
                });
                this._connectToNewUser(userId, stream);
            });
        });

        this.socket.on("new_message", (message: string) => {
            action(() => {
                this._messages.push({
                    message,
                    isUser: false,
                    type: EMessageType.Message,
                });
            })();
        });

        this.socket.on("mute", (on: boolean) => {
            console.log("partner", on);
            console.log("user", this.isMicroOn);
            return (this.partnerMicroStatus = on);
        });

        return "ok";
    };

    private _extractLinks = (message: string): (TLink | string)[] => {
        if (!message) return [];
        const splitted = message.split(" ");
        const messages: (TLink | string)[] = [];

        splitted.forEach((e) => {
            if (validationServices.isUrl(e)) {
                let splittedHttp = e.split("http://");

                if (splittedHttp.length === 1)
                    splittedHttp = e.split("https://");

                const last = splittedHttp[splittedHttp.length - 1];
                let content = last,
                    href = e;
                if (last.length > 35) content = last.substring(0, 35) + "...";

                if (!e.includes("https://") && !e.includes("http://")) {
                    href = "http://" + e;
                }

                messages.push({ content, href });
            } else messages.push(e);
        });

        return messages;
    };

    private _setVideo = (
        id: string,
        stream: MediaStream | MediaSource | Blob
    ) => {
        var video = document.querySelector<HTMLVideoElement>(id);
        if (video?.src != null) {
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                //@ts-ignore
                video.src = window.URL.createObjectURL(stream); // for older browsers
            }
        }
    };

    private _connectToNewUser(userId: string, stream: MediaStream) {
        const call = this.peer?.call(userId, stream);

        call?.on("stream", (partnerStream) => {
            this.partnerConnected = true;
            this._setVideo("video#partner-video", partnerStream);

            this.endCall = () => {
                call.close();
                this.socket = null;
                this.peer = null;
                this.partnerConnected = false;
            }

            this.socket?.on("disconnected", () => {
                call.close();
                this.partnerConnected = false;
                this._messages.push({
                    isUser: userId === localStorage.getItem("uid"),
                    type: EMessageType.DisconnectMessage,
                    message: "",
                });
            });
        });

        call?.on("error", this.onErrorCb);
    }

    public fetchConsultation = async (id: string) : Promise<void> => {
        console.log("fetch consultation with id", id);
        this.loading = true;

        await action(async () => {
            const cons = await this._fetchConsultation(id).catch(() => null);
            this.loading = false;

            console.log(cons);

            if (cons == null) throw "not_authorize";

            if (cons === "error") this.error = true;
            else if (cons === "unauthorized") throw "not_authorize";
            else {
                this.consultation = cons;

                const uid = localStorage.getItem("uid");
                this._messages =
                    cons.messages?.map((e : any) => ({
                        isUser: e.user === uid,
                        message: e.message,
                        type: EMessageType.Message,
                    })) ?? [];

                const isUser = localStorage.getItem("isUser") === "true";
                if (isUser && typeof cons?.doctor !== "string") {
                    this.partnerImagePath = cons.doctor.photoUrl;
                    this.partnerName = cons.doctor.fullName;
                    this.partnerSpeciality =
                        cons.doctor.speciality.length >= 1
                            ? cons.doctor.speciality[0]
                            : "";
                } else if (typeof cons?.patient !== "string") {
                    this.partnerImagePath = cons.patient.photoUrl;
                    this.partnerName = cons.patient.fullName;
                }

                this._messages.push({
                    isUser: true,
                    type: EMessageType.ConnectMessage,
                    message: "",
                });
            }
        })();
    };

    private _fetchConsultation = async (
        id: string
    ): Promise<Consultation | "error" | "unauthorized"> => {
        const response = await authFetch(() =>
            axios.get(
                process.env.REACT_APP_SERVER_URL + "/api/consultation/" + id,
                {
                    headers: {
                        auth: tokenServices.header,
                    },
                }
            )
        );

        if (response.status === EAuthFetch.Error) return "error";
        if (response.status === EAuthFetch.Unauthorized) return "unauthorized";

        return response.data.consultation;
    };

    @observable error: boolean = false;
    @observable loading: boolean = false;
    @observable consultation?: Consultation;

    @observable isCameraOn: boolean = true;
    @observable isMicroOn: boolean = false;
    @observable isChatOn: boolean = false;

    // partner
    @observable isMinimized: boolean = false;
    @observable partnerImagePath?: string;
    @observable partnerMicroStatus: boolean = false;
    @observable partnerName: string = "";
    @observable partnerSpeciality: string = "";
    @observable partnerConnected: boolean = false;
    @observable unreadMessages : number = 0;

    // Chat
    public message: string = "";
    @observable private _messages: TMessage[] = [];

    public getBlocks = (): TMessageBlock[] => {
        let blocks: TMessageBlock[] = [];
        this._messages.forEach((e, i) => {
            if (e.type === EMessageType.Message) {
                if (
                    i > 0 &&
                    blocks[blocks.length - 1].isUser === e.isUser &&
                    blocks[blocks.length - 1].type === e.type
                ) {
                    blocks[blocks.length - 1].content.push(
                        this._extractLinks(e.message)
                    );
                } else {
                    blocks.push({
                        isUser: e.isUser,
                        content: [this._extractLinks(e.message)],
                        type: EMessageType.Message,
                    });
                }
            } else {
                blocks.push({ ...e, content: [this._extractLinks(e.message)] });
            }
        });

        return blocks;
    };

    @action addMessage(): void {
        this._messages.push({
            message: this.message,
            isUser: true,
            type: EMessageType.Message,
        });
        this.socket?.emit(
            "new_message",
            this.message,
            localStorage.getItem("uid")
        );
    }
}

export interface IConsultationController {
    isCameraOn: boolean;
    isMicroOn: boolean;
    isChatOn: boolean;
}

export type TLink = {
    href: string;
    content: string;
};

export type TMessage = {
    isUser: boolean;
    message: string;
    type: EMessageType;
};

export enum EMessageType {
    Message,
    ConnectMessage,
    DisconnectMessage,
}

export type TMessageContent = (TLink | string)[];

export type TMessageBlock = {
    isUser: boolean;
    content: TMessageContent[];
    type: EMessageType;
};

