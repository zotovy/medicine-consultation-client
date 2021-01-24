import React from "react";
import MediaQuery from "react-responsive";
import { LongArrowIcon } from "@/static/icons";
import formatServices from "@/services/format-services";
import styles from "./support-chat.module.scss";

// icons
// import TechIcon from "../../../../st";
// import DoctorIcon from "@/static/icons/support-doctor-problem.png";
// import OtherIcon from "@/static/icons/support-other-problem.png";

const SupportProblemToIcon = new Map<SupportChatProblemType, string>();
SupportProblemToIcon.set("Tech", "../../../../static/icons/support-tech-problem.png");
SupportProblemToIcon.set("Doctor", "../../../../static/icons/support-doctor-problem.png");
SupportProblemToIcon.set("Other", "../../../../static/icons/support-other-problem.png");

const SupportChatComponent: React.FC<SupportChatType> = (chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    const user = JSON.parse(localStorage.getItem("user") as string);

    return <div className={styles.supportChatComponent}>
        <div className={`${styles.row} ${styles.mainRow}`}>
            <div className={styles.icon}>
                <img src={SupportProblemToIcon.get(chat.problem)} alt={`${chat.problem}-icon`}/>
            </div>

            <div className={styles.column}>
                <div className={styles.row}>
                    <h5 className={styles.title}>{ chat.title }</h5>
                    <div className={styles.information}>
                        {
                            !chat.readByUser ? <span className={styles.newMessage}>Новое сообщение</span> : <React.Fragment/>
                        }
                        <span className={styles.number}>№{ chat.number }</span>
                        <span className={styles.lastMessageTime}>
                        { formatServices.formatToUsualDate(lastMessage.date, true, true).toLowerCase() }
                    </span>
                    </div>
                </div>
                <div className={styles.space} />
                <div className={styles.row} >
                    <MediaQuery minWidth={959}>
                        <p className={styles.lastMessage} >
                            { `${lastMessage.isUser ? user.name : "Администратор"}: ${lastMessage.content}` }
                        </p>
                    </MediaQuery>
                    <LongArrowIcon className={styles.longArrowIcon} />
                </div>
            </div>
        </div>
        <MediaQuery maxWidth={960}>
            <p className={styles.lastMessage}>
                { `${lastMessage.isUser ? user.name : "Администратор"}: ${lastMessage.content}` }
            </p>
        </MediaQuery>
    </div>;
}

export default SupportChatComponent;