import React from "react";
import { LoadingIndicator } from "../../../components/loading-indicator";
import NavigationComponent from "./navigation";
import MediaQuery from "react-responsive";

type Props = {
    active: number;
}

const SettingsLoadingComponent: React.FC<Props> = ({ active }) => {
    return <main className="settings-page">

        <MediaQuery minWidth={425}>
            <NavigationComponent active={active}/>
        </MediaQuery>

        <section className="content">
            <div className="settings-loading">
                <LoadingIndicator/>
            </div>
        </section>
    </main>
}

export default SettingsLoadingComponent;