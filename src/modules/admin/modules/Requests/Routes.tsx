import React from "react";
import { observer } from "mobx-react";
import Topbar from "./components/topbar";
import List from "./components/list";
import Grid from "./components/grid";
import NoData from "./components/no-data";
import store from "./store";
import './routes.scss';


const Routes: React.FC = () => {
    return <div className="page" id="requests">
        <Topbar />
        {
            store.requests.length === 0 ? <NoData /> : store.isListView ? <List /> : <Grid />
        }
    </div>
}

export default observer(Routes);