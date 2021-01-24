import React, { useEffect } from "react";
import Link from "next/link";
import { observer, Observer } from "mobx-react";
import SupportController from "../../controllers/support-controller";
import SupportChatComponent from "../../components/support-chat";
import SupportHeader from "../../components/header";
import styles from "./support.module.scss";
import withController from "../../../../utils/inject";

/**
 * This page is injectable. Do not use it without any wrapper
 */

type ControllersProps = { supportController: SupportController  }

const SupportPage: React.FC<ControllersProps> = (props) => {
    const controller = props.supportController;
    useEffect(() => {
        if (!controller.fetchedChats) controller.fetchChats();
    }, []);

    return <div className={styles.supportPage}>
        <SupportHeader title="Центр поддержки" link="/settings/support/create"/>

        <Observer>
            {
                () => <div className={styles.chatsList} key={"chat-list"}>
                    {
                        controller.chats.map(e => {
                            return <React.Fragment>
                                <Link passHref  href={{
                                    pathname: `/settings/support/chat`,
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
            }
        </Observer>
    </div>
}

export default withController(observer(SupportPage), "supportController");