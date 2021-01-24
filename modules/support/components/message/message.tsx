import React from "react";
import styles from "./message.module.scss";

type Props = {
  time: string;
  content: string;
  photoUrl?: string;
}

export const BaseMessage: React.FC<Props> = ({ time, content, photoUrl }) => {
    if (!photoUrl) photoUrl = "@/static/images/user-placeholder.jpg";

    return <React.Fragment>
        <span className={styles.time}>{ time }</span>
        <span className={styles.messageContent}>{ content }</span>
        <div className={styles.photoUrl} style={{ backgroundImage: `url(${photoUrl})` }} />
    </React.Fragment>
}


type UserMessageProps = Props;
export const UserMessage: React.FC<UserMessageProps> = (props) => {
    return <div className={`${styles.userMessage} ${styles.support__message}`}>
        <BaseMessage {...props} />
    </div>
}

type AdminMessageProps = { time: string, content: string };
export const AdminMessage: React.FC<AdminMessageProps> = (props) => {
    return <div className={`adminMessages ${styles.support__message}`}>
        <BaseMessage {...props} photoUrl="@/static/images/user-placeholder.jpg" />
    </div>
}



