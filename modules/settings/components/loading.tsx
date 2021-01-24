import React from "react";
import Menu from "@/components/menu";
import { LoadingIndicator } from "@/components/loading-indicator";
import NavigationComponent from "./navigation";

type Props = {
    active: string;
}

const SettingsLoadingComponent: React.FC<Props> = ({ active }) => {
    return <React.Fragment>
        <Menu/>
        <main className="settings-page">
            <NavigationComponent active={active}/>
            <section className="content">
                <div className="settings-loading">
                    <LoadingIndicator/>
                </div>
            </section>
        </main>
    </React.Fragment>
}

export default SettingsLoadingComponent;