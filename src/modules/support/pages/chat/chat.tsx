import React, { useEffect } from "react";
import { toJS } from "mobx";
import { Observer } from "mobx-react"
import qs from "query-string";
import { useHistory } from "react-router-dom";
import SupportHeader from "../../components/header";
import controller from "../../controllers/support-controller";
import { AdminMessage, UserMessage } from "../../components/message/message";
import formatServices from "../../../../services/format-services";
import { SendIcon } from "../../../../static/icons";

import "./chat.scss";

/**
 * This page is injectable. Do not use it without any wrapper
 */

const ChatPage: React.FC = () => {
    const history = useHistory();
    const id = qs.parse(history.location.search).id;
    const chat = controller.chats.find((e) => e.number.toString() === id);
    const user: UserType = JSON.parse(localStorage.getItem("user") as string);
    if (!chat) {
        history.goBack();
        return <React.Fragment/>
    }

    useEffect(() => {
        console.log(toJS(chat));
        if (!chat.readByUser) controller.setReadByUser(chat._id);
    }, [id]);

    return <div className="chat-support-page">
        <SupportHeader title={chat.title} link="/settings/support/" back="Назад"/>

        <div className="messages">
            <Observer>
                {
                    () => <React.Fragment>
                        {
                            chat.messages.map(e => {
                                const time = formatServices.formatToUsualDate(e.date, true, true);
                                if (e.isUser) return <UserMessage time={time} content={e.content} photoUrl={user.photoUrl}/>
                                else return <AdminMessage time={time} content={e.content} />
                            })
                        }
                    </React.Fragment>
                }
            </Observer>
        </div>

        <div className="message-input">
            <input type="text" placeholder="Введите ваше сообщение"/>
            <button className="send-message">
                <SendIcon/>
            </button>
        </div>
    </div>
}

export default ChatPage;