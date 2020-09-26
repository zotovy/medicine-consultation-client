import { observer } from "mobx-react";
import React from "react";
import controller from "../../controller/consultation-controller";

const Chat: React.FC = () => {

    if (!controller.isChatOn) return <React.Fragment />

    return <div className="chat">
        <header>
            <div className="avatar"></div>
            <div className="info">
                <span id="name">{controller.partnerName}</span>
                <span id="speciality">({controller.partnerSpeciality})</span>
            </div>
        </header>
        <div className="messages">
            <div className="block partner-block">
                <div className="avatar"></div>
                <div className="message">
                    <span className="">Добрый день, что вас беспокоит?</span>
                </div>
                <div className="message">
                    <span className="">Здравствуйте! Температура 37.5</span>
                </div>
            </div>
        </div>
    </div>;
};

export default observer(Chat);