import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import controller, { TMessageBlock } from "../../controller/consultation-controller";

const MessagesComponent: React.FC = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const blocks: TMessageBlock[] = Array.from(controller.getBlocks());

    setTimeout(scrollToBottom, 0);

    return <div className="messages" >
        {
            blocks.map((e, i) => {

                if (e.isUser) {
                    return <div className="block user-block" key={"user-block-" + i}>
                        {
                            e.content.map((message, i) => <div className="message" key={"partner" + message + i}>
                                <span>{message}</span>
                            </div>)
                        }

                    </div>;
                } else {
                    return <div className="block partner-block" key={"partner-block-" + i}>
                        <div className="avatar"></div>
                        {
                            e.content.map((message, i) => <div className="message" key={"user" + message + i}>
                                <span>{message}</span>
                            </div>)
                        }
                    </div>;
                }
            })
        }
        <div className="message-end-helper" ref={messagesEndRef}></div>
    </div>;


}

export default observer(MessagesComponent);