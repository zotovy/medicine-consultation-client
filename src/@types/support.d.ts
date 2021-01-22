declare type SupportChatType = {
    _id: string;
    user: string | UserType;
    messages: SupportMessageType[],
    title: string,
    timestamp: Date,
    problem: SupportChatProblemType,
    number: number,
    readByUser: boolean;
}

declare type SupportMessageType = {
    content: string,
    isUser: boolean,
    date: Date,
}

declare type SupportChatProblemType = "Tech" | "Doctor" | "Other";