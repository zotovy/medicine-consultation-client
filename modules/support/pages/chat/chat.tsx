import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react"
import SupportController from "../../controllers/support-controller";
import SupportHeader from "../../components/header";
import { AdminMessage, UserMessage } from "../../components/message/message";
import formatServices from "@/services/format-services";
import { SendIcon } from "@/static/icons";
import styles from "./chat.module.scss";
import withController from "../../../../utils/inject";

/**
 * This page is injectable. Do not use it without any wrapper
 */

type ControllersProps = { supportController: SupportController };

const ChatPage: React.FC<ControllersProps> = (props) => {
    const controller = props.supportController;

    useEffect(() => {
        if (controller.chats.length == 0) {
            controller.fetchChats();
        }
    }, []);

    const router = useRouter();
    const id = router.query.id
    const chat = controller.chats.find((e) => e.number.toString() === id);

    useEffect(() => {
        if (chat && !chat.readByUser) controller.setReadByUser(chat._id);
    }, [id]);

    if (controller.loading) return <React.Fragment/>
    if (!chat) {
        if (typeof window === "undefined") return <React.Fragment/>;
        router.back();
        return <React.Fragment/>
    }

    const user: UserType = JSON.parse(localStorage.getItem("user") as string);

    return <div className={styles.chatSupportPage}>
        <SupportHeader title={chat.title} link="/settings/support/" back="Назад"/>

        <div className={styles.messages}>
            {
                chat.messages.map(e => {
                    const time = formatServices.formatToUsualDate(e.date, true, true);
                    if (e.isUser) return <UserMessage key={`user-${e.date}`} time={time} content={e.content} photoUrl={user.photoUrl}/>
                    else return <AdminMessage key={`admin-${e.date}`} time={time} content={e.content} />
                })
            }
        </div>

        <div className={styles.messageInput}>
            <input
                type="text"
                placeholder="Введите ваше сообщение"
                value={controller.chatMessage}
                onChange={(e) => controller.chatMessage = e.target.value}
            />
            <button  onClick={() => controller.sendMessage(chat._id)}>
                <SendIcon/>
            </button>
        </div>
    </div>
}

export default withController(observer(ChatPage), "supportController");