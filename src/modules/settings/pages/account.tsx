import React from 'react';
import { observer } from "mobx-react";
import "../styles.scss"
import NavigationComponent from "../components/navigation";

const SettingsAccountPage = () => {
    return <main className="account-page settings">
        <NavigationComponent active={0}/>
        <section className="content account">
        </section>
    </main>;
};

export default observer(SettingsAccountPage);

