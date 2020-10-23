import React from "react";
import { EMessageType } from "../../controller/consultation-controller";
import controller from "../../controller/consultation-controller";

type Props = {
    isUser: boolean;
    type: EMessageType;
}

const ConnectionMessage: React.FC<Props> = ({ isUser, type }) => {

    let message = "";

    if (type === EMessageType.ConnectMessage) {
        if (isUser) message = "Вы подключились";
        else message = `${controller.partnerName} подключился(-лась)`
    }
    else if (type === EMessageType.DisconnectMessage) {
        if (isUser) message = "Вы отключились";
        else message = `${controller.partnerName} отключился(-лась)`
    }


    return <div className="connection-message">
        <span>{message}</span>
    </div>

};

export default ConnectionMessage;