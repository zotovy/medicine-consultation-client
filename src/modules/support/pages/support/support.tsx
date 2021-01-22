import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { observer, Observer } from "mobx-react";
import "./support.scss";
import controller from "../../controllers/support-controller";
import SupportChatComponent from "../../components/support-chat";
import SupportHeader from "../../components/header";

/**
 * This page is injectable. Do not use it without any wrapper
 */

const SupportPage: React.FC = () => {

    useEffect(() => {
        controller.fetchChats();
    }, []);

    return <div className="support-page">
        <SupportHeader title="Центр поддержки" link="/settings/support/create"/>

        <Observer>
            {
                () => <div className="chats-list">
                    {
                        controller.chats.map(e => <Link to={{
                            pathname: "/settings/support/chat",
                            search: `?id=${e.number}`
                        }}>
                            <SupportChatComponent {...e} />
                        </Link>)
                    }
                </div>
            }
        </Observer>
    </div>
}

export default observer(SupportPage);