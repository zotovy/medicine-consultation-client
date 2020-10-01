import { action, observable } from "mobx";
import openSocket from "socket.io-client";

class ConsultationController implements IConsultationController {
    // Socket
    socket: SocketIOClient.Socket | null = null;

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

        this.socket = openSocket(process.env.REACT_APP_SERVER_URL ?? "", {
            query,
            transports: ["websocket"],
        });

        this.socket.on("error", args.onError);
        this.socket.on("success", args.onSuccess);

        this.socket.on("new_message", (message: string) => {
            console.log("new message!", message);
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
