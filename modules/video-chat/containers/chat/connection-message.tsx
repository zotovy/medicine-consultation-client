import React from "react";
import { EMessageType } from "@/modules/video-chat/types";

type Props = {
    partnerName: string;
    isUser: boolean;
    type: EMessageType;
}

const ConnectionMessage: React.FC<Props> = ({ isUser, type, partnerName }) => {
    let message = "";

    if (type === EMessageType.ConnectMessage) {
        if (isUser) message = "Вы подключились";
        else message = `${partnerName} подключился(-лась)`
    }
    else if (type === EMessageType.DisconnectMessage) {
        if (isUser) message = "Вы отключились";
        else message = `${partnerName} отключился(-лась)`
    }


    return <div className="connection-message">
        <span>{message}</span>
    </div>
};

export default ConnectionMessage;
