import React, { useEffect } from "react";
import Link from "next/link";
import { observer } from "mobx-react";
import SupportController from "../../controllers/support-controller";
import SupportChatComponent from "../../components/support-chat";
import SupportHeader from "../../components/header";
import styles from "./support.module.scss";
import { TYPES, useInjection } from "../../../../container";

/**
 * This page is injectable. Do not use it without any wrapper
 */


const SupportPage: React.FC = (props) => {
    const controller = useInjection<SupportController>(TYPES.supportController);
    useEffect(() => {
        if (!controller.fetchedChats) controller.fetchChats();
    }, []);

    return <div className={styles.supportPage}>
        <SupportHeader title="Центр поддержки" link="/settings/support/create"/>
        <div className={styles.chatsList} key={"chat-list"}>
            {
                controller.chats.map(e => {
                    return <React.Fragment key={e._id}>
                        <Link passHref  href={{
                            pathname: "/settings/support/chat",
                            query: { id: e.number }
                        }}>
                            <a>
                                <SupportChatComponent key={e._id} {...e} />
                            </a>
                        </Link>
                    </React.Fragment>;
                })
            }
        </div>
    </div>
}

export default observer(SupportPage);
