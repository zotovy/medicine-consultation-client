import React from "react";
import { Route } from "react-router-dom";

import SupportPage from "./pages/support/support";
import CreatePage from "./pages/create/create";
import ChatPage from "./pages/chat/chat";

const SupportModule = () => {
    return <div className="support-module" >
        <Route path="/settings/support" exact>
            <SupportPage/>
        </Route>
        <Route path="/settings/support/create" exact>
            <CreatePage/>
        </Route>
        <Route path="/settings/support/chat" exact>
            <ChatPage/>
        </Route>
    </div>
}

export default SupportModule;
