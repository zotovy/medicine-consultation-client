import React from "react";
import { observer } from "mobx-react";
import controller from "../../controller/consultation-controller";
import Messages from "./messages";
import { SendIcon } from "../../icons";

const Chat: React.FC = () => {

    const _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') controller.addMessage();
    }

    return <div className={`chat ${controller.isChatOn ? "enable" : ""}`}>
        <header>
            <div className="avatar"></div>
            <div className="info">
                <span id="name">{controller.partnerName}</span>
                <span id="speciality">({controller.partnerSpeciality})</span>
            </div>
        </header>
        <Messages />
        <div className="textfield">
            <input
                type="text"
                className="text"
                placeholder="Введите сообщение"
                onChange={e => controller.message = e.target.value}
                onKeyDown={_handleKeyDown}
            />
            <button id="send" onClick={() => controller.addMessage()}>
                <SendIcon />
            </button>
        </div>
    </div>;
};

export default observer(Chat);