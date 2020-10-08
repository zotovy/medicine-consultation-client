import { action, observable } from "mobx";
import Peer from "peerjs";
import io from "socket.io-client";

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

        this.socket.on("error", args.onError);
        this.socket.on("success", async () => {
            console.log("success!");

            this.socket?.on("connect", () => {
                console.log(this.socket?.id);
            });

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            this._setVideo("video#user-video", stream);

            this.peer = new Peer({
                host: process.env.REACT_APP_PEER_SERVER_URL,
                port: 5001,
                path: "/mc",
            });
            console.log("peer have been created");

            this.peer.on("call", (call) => {
                console.log("on call ");
                call.answer(stream);
                call.on("stream", (partnerStream) => {
                    this._setVideo("video#partner-video", partnerStream);
                });
            });

            this.peer.on("open", (id) => {
                this.socket?.emit("user-connected", id);
            });

            this.socket?.on("user-connected", (userId: string) => {
                console.log("user-connected", userId);
                this._connectToNewUser(userId, stream);
            });
        });

        this.socket.on("new_message", (message: string) => {
            this._messages.push({ content: message, isUser: false });
        });

        this.socket.on(
            "messages",
            (messages: { content: string; user: string }[]) => {
                const uid = localStorage.getItem("uid");
                this._messages = messages.map((e) => ({
                    isUser: e.user === uid,
                    content: e.content,
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

    // @observable partnerVideo: MutableRefObject<
    //     HTMLVideoElement | undefined
    // > = useRef<HTMLVideoElement>();
    @observable stream: MediaStream | undefined;
    @observable isCameraOn: boolean = false;
    @observable isMicroOn: boolean = false;
    @observable isChatOn: boolean = true;

    // partner
    @observable isMinimized: boolean = true;
    @observable partnerImagePath?: string;
    @observable partnerMicroStatus: boolean = false;
    @observable partnerName: string = "Иванова Елена";
    @observable partnerSpeciality: string = "Педиатр";

    // Chat
    public message: string = "";
    @observable private _messages: TMessage[] = [];

    public getBlocks = (): TMessageBlock[] => {
        let blocks: TMessageBlock[] = [];

        this._messages.forEach((e, i) => {
            if (i > 0 && blocks[blocks.length - 1].isUser == e.isUser) {
                blocks[blocks.length - 1].content.push(e.content);
            } else {
                blocks.push({ isUser: e.isUser, content: [e.content] });
            }
        });

        return blocks;
    };

    @action addMessage(): void {
        this._messages.push({ content: this.message, isUser: true });
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
    content: string;
};

export type TMessageBlock = {
    isUser: boolean;
    content: string[];
};

export default new ConsultationController();
