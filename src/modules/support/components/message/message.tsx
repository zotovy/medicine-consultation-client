import React from "react";
import "./message.scss";

import adminPhotoUrl from "../../../../static/images/user-placeholder.jpg";

type Props = {
  time: string;
  content: string;
  photoUrl?: string;
}

export const BaseMessage: React.FC<Props> = ({ time, content, photoUrl }) => {
    if (!photoUrl) photoUrl = adminPhotoUrl;

    return <React.Fragment>
        <span className="time">{ time }</span>
        <span className="message-content">{ content }</span>
        <div className="photoUrl" style={{ backgroundImage: `url(${photoUrl})` }} />
    </React.Fragment>
}


type UserMessageProps = Props;
export const UserMessage: React.FC<UserMessageProps> = (props) => {
    return <div className="user-message support__message">
        <BaseMessage {...props} />
    </div>
}

type AdminMessageProps = { time: string, content: string };
export const AdminMessage: React.FC<AdminMessageProps> = (props) => {
    return <div className="admin-message support__message">
        <BaseMessage {...props} photoUrl={adminPhotoUrl} />
    </div>
}



