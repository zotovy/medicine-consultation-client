import React from "react";
import formatServices from "../../../../services/format-services";
import "./support-chat.scss";

// icons
import TechIcon from "../../../../static/icons/support-tech-problem.png";
import DoctorIcon from "../../../../static/icons/support-doctor-problem.png";
import OtherIcon from "../../../../static/icons/support-other-problem.png";
import { LongArrowIcon } from "../../../../static/icons";
import MediaQuery from "react-responsive";

const SupportProblemToIcon = new Map<SupportChatProblemType, string>();
SupportProblemToIcon.set("Tech", TechIcon);
SupportProblemToIcon.set("Doctor", DoctorIcon);
SupportProblemToIcon.set("Other", OtherIcon);

const SupportChatComponent: React.FC<SupportChatType> = (chat) => {

    const lastMessage = chat.messages[chat.messages.length - 1];
    const user = JSON.parse(localStorage.getItem("user") as string);

    return <div className="support-chat-component">
        <div className="row main-row">
            <div className="icon">
                <img src={SupportProblemToIcon.get(chat.problem)} alt={`${chat.problem}-icon`}/>
            </div>

            <div className="column">
                <div className="row">
                    <h5 className="title">{ chat.title }</h5>
                    <div className="information">
                        {
                            !chat.readByUser ? <span className="new-message">Новое сообщение</span> : <React.Fragment/>
                        }
                        <span className="number">№{ chat.number }</span>
                        <span className="last-message-time ">
                        { formatServices.formatToUsualDate(lastMessage.date, true, true).toLowerCase() }
                    </span>
                    </div>
                </div>
                <div className="space"/>
                <div className="row">
                    <MediaQuery minWidth={959}>
                        <p className="last-message">
                            { `${lastMessage.isUser ? user.name : "Администратор"}: ${lastMessage.content}` }
                        </p>
                    </MediaQuery>
                    <LongArrowIcon className="long-arrow-icon"/>
                </div>
            </div>
        </div>
        <MediaQuery maxWidth={960}>
            <p className="last-message">
                { `${lastMessage.isUser ? user.name : "Администратор"}: ${lastMessage.content}` }
            </p>
        </MediaQuery>
    </div>;
}

export default SupportChatComponent;