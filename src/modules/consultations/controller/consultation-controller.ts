import { action, observable } from "mobx";
import openSocket from "socket.io-client";

class ConsultationController implements IConsultationController {
    // Socket

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

        const socket: SocketIOClient.Socket = openSocket(
            process.env.REACT_APP_SERVER_URL ?? "",
            { query, transports: ["websocket"] }
        );

        socket.on("error", args.onError);
        socket.on("success", args.onSuccess);

        return "ok";
    };

    @observable isCameraOn: boolean = true;
    @observable isMicroOn: boolean = false;
    @observable isChatOn: boolean = true;

    // partner
    @observable isMinimized: boolean = false;
    @observable partnerImagePath?: string;
    @observable partnerMicroStatus: boolean = false;
    @observable partnerName: string = "Иванова Елена";
    @observable partnerSpeciality: string = "Педиатр";

    // Chat
    public message: string = "";
    @observable private _messages: TMessage[] = [
        {
            isUser: false,
            content: "a123",
        },
        {
            isUser: false,
            content: "a456",
        },
        {
            isUser: false,
            content: "a789",
        },
        {
            isUser: true,
            content: "b456",
        },
        {
            isUser: true,
            content: "b789",
        },
        {
            isUser: false,
            content: "a111",
        },
        {
            isUser: true,
            content: "b111",
        },
    ];

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
        console.log(this._messages);
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
