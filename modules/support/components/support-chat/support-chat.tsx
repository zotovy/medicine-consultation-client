import React from "react";
import { LongArrowIcon } from "@/static/icons";
import FormatServices from "@/services/format-services";
import styles from "./support-chat.module.scss";
// import { useWindowWidth } from "@react-hook/window-size";

const SupportProblemToIcon = new Map<SupportChatProblemType, string>();
SupportProblemToIcon.set("Tech", "../../../../static/icons/support-tech-problem.png");
SupportProblemToIcon.set("Doctor", "../../../../static/icons/support-doctor-problem.png");
SupportProblemToIcon.set("Other", "../../../../static/icons/support-other-problem.png");

const SupportChatComponent: React.FC<SupportChatType> = (chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    const user = JSON.parse(localStorage.getItem("user") as string);

    const width = 1920;

    return <div className={styles.supportChatComponent}>
        <div className={`${styles.row} ${styles.mainRow}`}>
            <div className={styles.icon}>
                <img src={SupportProblemToIcon.get(chat.problem)} alt={`${chat.problem}-icon`}/>
            </div>

            <div className={styles.column}>
                <div className={styles.row}>
                    <h5 className={styles.title}>{chat.title}</h5>
                    <div className={styles.information}>
                        {
                            !chat.readByUser ? <span className={styles.newMessage}>Новое сообщение</span> :
                                    <React.Fragment/>
                        }
                        <span className={styles.number}>№{chat.number}</span>
                        <span className={styles.lastMessageTime}>
                        {FormatServices.formatToUsualDate(lastMessage.date, true, true).toLowerCase()}
                    </span>
                    </div>
                </div>
                <div className={styles.space}/>
                <div className={styles.row}>
                    {
                        width > 959
                                ? <p className={styles.lastMessage}>
                                    {`${lastMessage.isUser ? user.name : "Администратор"}: ${lastMessage.content}`}
                                </p>
                                : <React.Fragment/>
                    }
                    <LongArrowIcon className={styles.longArrowIcon}/>
                </div>
            </div>
        </div>
        {
            width <= 960
                    ? <p className={styles.lastMessage}>
                        {`${lastMessage.isUser ? user.name : "Администратор"}: ${lastMessage.content}`}
                    </p>
                    : <React.Fragment/>
        }
    </div>;
}

export default SupportChatComponent;
