import React, { useState } from "react";
import { observer } from "mobx-react";
import ConsultationController from "@/modules/consultations/controllers/consultation-controller";
import { TYPES, useInjection } from "container";
import Messages from "./messages";
import { BackIcon, SendIcon } from "../../icons";

const Chat: React.FC = () => {
    const controller = useInjection<ConsultationController>(TYPES.consultationController);

    const avatar = {
        backgroundImage: `url("${controller.partnerImagePath?.trim() == "" 
            ? "../../../../static/user-placeholder.jpg" 
            : controller.partnerImagePath}")`,
    }

    return <div className={`chat ${controller.isChatOn ? "" : "off"}`}>
        <header>
            <div className="back" onClick={() => controller.isChatOn = false}>
                <BackIcon/>
            </div>
            <div className="avatar" style={avatar}/>
            <div className="info">
                <span id="name">{controller.partnerName}</span>
                {
                    controller.partnerSpeciality !== ""
                        ? <span id="speciality">({controller.partnerSpeciality})</span>
                        : <React.Fragment />
                }
            </div>
        </header>
        <Messages />
        <TextField />
    </div>;
};


const TextField = observer(() => {
    const controller = useInjection<ConsultationController>(TYPES.consultationController);
    const [input, setInput] = useState("");

    const _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setInput("");
            controller.addMessage();
        }

    }

    return <div className="textfield">
        <input
            type="text"
            className="text"
            placeholder="Введите сообщение"
            onChange={e => {
                controller.message = e.target.value;
                setInput(e.target.value);
            }}
            onKeyDown={_handleKeyDown}
            value={input}
        />
        <button id="send" onClick={() => {
            setInput("");
            controller.addMessage();
        }}>
            <SendIcon />
        </button>
    </div>
});

export default observer(Chat);