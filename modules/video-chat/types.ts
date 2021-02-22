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
