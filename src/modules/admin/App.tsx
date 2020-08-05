import React from "react";
import { Route } from "react-router-dom";
import Routes from "./modules/Requests/Routes";
import "./translation";
import RequestRemoveModal from "./modules/Requests/components/remove-modal";
import RequestSubmitModal from "./modules/Requests/components/submit-modal";


// Components
import Bar from "./bar";

import "./index.scss";

const App: React.FC = () => {
    return <React.Fragment>
        <RequestRemoveModal />
        <RequestSubmitModal />

        <Route path="/admin/" children={<Bar />} />
        <div className="view">
            <Route path="/admin/requests" exact children={<Routes />} />
        </div>

    </React.Fragment>;
}

export default App;