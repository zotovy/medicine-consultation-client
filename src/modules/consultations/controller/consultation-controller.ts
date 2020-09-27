import { action, observable } from "mobx";

class ConsultationController implements IConsultationController {
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
