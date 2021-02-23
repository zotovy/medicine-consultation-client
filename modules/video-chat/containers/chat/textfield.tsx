import React, { useState } from "react";
import { SendIcon } from "@/modules/consultations/icons";

const TextField: React.FC<Props> = (props) => {
    const [input, setInput] = useState("");

    const _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setInput("");
        }

    }

    return <div className="textfield">
        <input
                type="text"
                className="text"
                placeholder="Введите сообщение"
                onChange={(e) => {
                    setInput(e.target.value);
                }}
                onKeyDown={_handleKeyDown}
                value={input}
        />
        <button id="send" onClick={() => {
            if (input === "") return;
            setInput("");
            props.sendMessage(input);
        }}>
            <SendIcon />
        </button>
    </div>
}

type Props = {
    sendMessage: (v: string) => any;
}
export default TextField;
