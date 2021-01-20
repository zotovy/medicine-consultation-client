declare type SupportChatType = {
    user: string | UserType;
    messages: SupportMessageType[],
    title: string,
    date: Date,
    problem: SupportChatProblemType,
    number: number,
}

declare type SupportMessageType = {
    content: string,
    isUser: boolean,
    date: Date,
}

declare type SupportChatProblemType = "Tech" | "Doctor" | "Other";