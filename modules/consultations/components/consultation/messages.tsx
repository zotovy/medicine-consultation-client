import React, { useRef } from "react";
import { observer } from "mobx-react";
import ConsultationController , { EMessageType, TMessageBlock, TMessageContent } from "../../controllers/consultation-controller";
import ConnectionMessage from "./connection";
import { TYPES, useInjection } from "container";

const MessagesComponent: React.FC = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const controller = useInjection<ConsultationController>(TYPES.consultationController);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const def = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg";
    const avatar = {
        backgroundImage: `url("${controller.partnerImagePath?.trim() == "" ? def : controller.partnerImagePath}")`,
    }

    const blocks: TMessageBlock[] = Array.from(controller.getBlocks());

    setTimeout(scrollToBottom, 0);


    return <div className="messages" >
        {
            blocks.map((e, i) => {
                switch (e.type) {
                    case EMessageType.Message:
                        if (e.isUser) {
                            return <div className="block user-block" key={"user-block-" + i}>
                                {
                                    e.content.map((message: TMessageContent, i: number) => {
                                        return <div className="message" key={"user" + message + i}>
                                            <span> {message.map(el => {
                                                if (typeof el == "string") return el;
                                                else return <a target="_blank" href={el.href}>{el.content}</a>
                                            })} </span>
                                        </div>
                                    })
                                }

                            </div>;
                        } else {
                            return <div className="block partner-block" key={"partner-block-" + i}>
                                <div className="avatar" style={avatar}/>
                                {
                                    e.content.map((message: TMessageContent, i: number) => {
                                        return <div className="message" key={"partner" + message + i}>
                                            <span> {message.map(el => {
                                                if (typeof el == "string") return el;
                                                else return <a target="_blank" href={el.href}>{el.content}</a>
                                            })} </span>
                                        </div>
                                    })
                                }
                            </div>;
                        }

                    case EMessageType.ConnectMessage:
                        return <ConnectionMessage isUser={e.isUser} type={e.type} />;

                    case EMessageType.DisconnectMessage:
                        return <ConnectionMessage isUser={e.isUser} type={e.type} />;
                }
            })
        }
        <div className="message-end-helper" ref={messagesEndRef}/>
    </div>;
}

export default observer(MessagesComponent);