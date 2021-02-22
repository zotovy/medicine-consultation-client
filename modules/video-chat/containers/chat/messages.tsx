import React, { useRef } from "react";
import { observer } from "mobx-react";
import ConnectionMessage from "./connection-message";
import { EMessageType, TMessageBlock, TMessageContent } from "@/modules/video-chat/types";

type Props = {
    partnerName: string;
    partnerImagePath?: string;
    blocks: TMessageBlock[];
}

const MessagesComponent: React.FC<Props> = (props) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const def = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg";
    const avatar = {
        backgroundImage: `url("${props.partnerImagePath?.trim() == "" ? def : props.partnerImagePath}")`,
    }

    const blocks: TMessageBlock[] = props.blocks;

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
                        return <ConnectionMessage partnerName={props.partnerName} isUser={e.isUser} type={e.type} />;

                    case EMessageType.DisconnectMessage:
                        return <ConnectionMessage partnerName={props.partnerName} isUser={e.isUser} type={e.type} />;
                }
            })
        }
        <div className="message-end-helper" ref={messagesEndRef}/>
    </div>;
}

export default observer(MessagesComponent);
