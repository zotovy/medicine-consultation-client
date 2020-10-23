import { action, observable } from "mobx";
import Peer from "peerjs";
import io from "socket.io-client";
import axios from "axios";
import { authFetch, EAuthFetch } from "../../../services/fetch_services";
import tokenServices from "../../../services/token-services";

class ConsultationController implements IConsultationController {
    // Socket
    socket: SocketIOClient.Socket | null = null;
    peer: Peer | null = null;

    setupSocket = async (
        consultationId: string,
        args: {
            onSuccess: (data: any) => any;
            onError: (data: string) => any;
        }
    ): Promise<string> => {
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
            console.log("success!");

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            this._setVideo("video#user-video", stream);

            let port;
            if (process.env.REACT_APP_PEER_SERVER_PORT != "default") {
                port = parseInt(process.env.REACT_APP_PEER_SERVER_PORT ?? "");
            }

            console.log(port);

            this.peer = new Peer({
                host: process.env.REACT_APP_PEER_SERVER_URL,
                port: port,
                path: "/mc",
            });
            console.log("peer have been created");

            this.peer.on("call", (call) => {
                call.answer(stream);
                call.on("stream", (partnerStream) => {
                    this._setVideo("video#partner-video", partnerStream);
                });
            });

            this.peer.on("open", (id) => {
                this.partnerConnected = true;
                this.socket?.emit("user-connected", id);
            });

            this.socket?.on("user-connected", (userId: string) => {
                console.log("user-connected", userId);
                this._connectToNewUser(userId, stream);
            });
        });

        this.socket.on("new_message", (message: string) => {
            this._messages.push({ message, isUser: false });
        });

        this.socket.on(
            "messages",
            (messages: { content: string; user: string }[]) => {
                const uid = localStorage.getItem("uid");
                this._messages = messages.map((e) => ({
                    isUser: e.user === uid,
                    message: e.content,
                }));
            }
        );

        return "ok";
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
            console.log("_connectToNewUser on stream", userId);
            this._setVideo("video#partner-video", partnerStream);
        });
    }

    public fetchConsultation = (id: string) => {
        console.log("fetch consultation with id", id);

        this.loading = true;

        action(async () => {
            const cons = await this._fetchConsultation(id).catch(() => null);
            this.loading = false;
            console.log(cons);

            if (cons == null) return;

            if (cons === "error") this.error = true;
            else if (cons === "unauthorized") throw "redirect-login";
            else {
                this.consultation = cons;

                const uid = localStorage.getItem("uid");
                this._messages =
                    cons.messages?.map((e) => ({
                        isUser: e.user === uid,
                        message: e.message,
                    })) ?? [];

                const isUser = localStorage.getItem("isUser") === "true";
                if (isUser && typeof cons?.doctorId !== "string") {
                    this.partnerImagePath = cons.doctorId.photoUrl;
                    this.partnerName = cons.doctorId.fullName;
                    this.partnerSpeciality =
                        cons.doctorId.speciality.length >= 1
                            ? cons.doctorId.speciality[0]
                            : "";
                } else if (typeof cons?.patientId !== "string") {
                    this.partnerImagePath = cons.patientId.photoUrl;
                    this.partnerName = cons.patientId.fullName;
                }
            }
        })();
    };

    private _fetchConsultation = async (
        id: string
    ): Promise<TConsultation | "error" | "unauthorized"> => {
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

        console.log(response.data.consultation);
        return response.data.consultation;
    };

    @observable error: boolean = false;
    @observable loading: boolean = false;
    @observable consultation?: TConsultation;

    @observable isCameraOn: boolean = false;
    @observable isMicroOn: boolean = false;
    @observable isChatOn: boolean = false;

    // partner
    @observable isMinimized: boolean = false;
    @observable partnerImagePath?: string;
    @observable partnerMicroStatus: boolean = false;
    @observable partnerName: string = "";
    @observable partnerSpeciality: string = "";
    @observable partnerConnected: boolean = false;

    // Chat
    public message: string = "";
    @observable private _messages: TMessage[] = [];

    public getBlocks = (): TMessageBlock[] => {
        let blocks: TMessageBlock[] = [];

        this._messages.forEach((e, i) => {
            if (i > 0 && blocks[blocks.length - 1].isUser == e.isUser) {
                blocks[blocks.length - 1].content.push(e.message);
            } else {
                blocks.push({ isUser: e.isUser, content: [e.message] });
            }
        });

        return blocks;
    };

    @action addMessage(): void {
        this._messages.push({ message: this.message, isUser: true });
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

export type TMessage = {
    isUser: boolean;
    message: string;
};

export type TMessageBlock = {
    isUser: boolean;
    content: string[];
};

export default new ConsultationController();
