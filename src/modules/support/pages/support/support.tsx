import React from "react";
import { Observer } from "mobx-react";
import { AddIcon } from "../../../../static/icons";
import "./styles.scss";
import controller from "../../controllers/support-controller";
import SupportChatComponent from "../../components/support-chat";

/**
 * This page is injectable. Do not use it without any wrapper
 */

const SupportPage: React.FC = () => {
    return <div className="support-page">
        <header>
            <h1>Центр поддержки</h1>
            <button id="create-question">
                <AddIcon/>
            </button>
        </header>

        <Observer>
            {
                () => <div className="chats-list">
                    {
                        controller.chats.map(e => <SupportChatComponent {...e} />)
                    }
                </div>
            }
        </Observer>
    </div>
}

export default SupportPage;