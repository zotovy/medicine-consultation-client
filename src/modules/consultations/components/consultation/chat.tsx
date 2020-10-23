import React, { useState } from "react";
import { observer } from "mobx-react";
import controller from "../../controller/consultation-controller";
import Messages from "./messages";
import { SendIcon } from "../../icons";

const Chat: React.FC = () => {




    const def = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg";
    const avatar = {
        backgroundImage: `url("${controller.partnerImagePath?.trim() == "" ? def : controller.partnerImagePath}")`,
    }

    console.log("rerendered!");

    return <div className={`chat ${controller.isChatOn ? "enable" : ""}`}>
        <header>
            <div className="avatar" style={avatar}></div>
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