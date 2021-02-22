import React, { useState } from "react";
import { SendIcon } from "@/modules/consultations/icons";

const TextField = () => {
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
            setInput("");
        }}>
            <SendIcon />
        </button>
    </div>
}

export default TextField;
