import React from "react";
import { Link } from "react-router-dom";
import { Observer } from "mobx-react";
import { AddIcon } from "../../../../static/icons";
import "./support.scss";
import controller from "../../controllers/support-controller";
import SupportChatComponent from "../../components/support-chat";

/**
 * This page is injectable. Do not use it without any wrapper
 */

const SupportPage: React.FC = () => {
    return <div className="support-page">
        <header>
            <h1>Центр поддержки</h1>
            <Link to="/settings/support/create">
                <button id="create-question">
                    <AddIcon/>
                </button>
            </Link>
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