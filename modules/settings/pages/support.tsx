import React from "react";
import { NextPage } from "next";
import { ChatPage, CreatePage, SupportPage } from "../../support";
import Menu from "@/components/menu";
import Navigation from "../components/navigation";
import GoBackIcon from "../components/go-back-icon";

const SupportSettingsPage: NextPage = () => {
    return <React.Fragment>
        <Menu/>
        <main className="support-page settings-page">
            <Navigation active="/support" />
            <GoBackIcon/>
            <section className="content support">
                <SupportPage/>
            </section>
        </main>
    </React.Fragment>
}

const SupportSettingsCreatePage: NextPage = () => {
    return <React.Fragment>
        <Menu/>
        <main className="support-page settings-page">
            <Navigation active="/support" />
            <GoBackIcon/>
            <section className="content support">
                <CreatePage/>
            </section>
        </main>
    </React.Fragment>
}

const SupportSettingsChatPage: NextPage = () => {
    return <React.Fragment>
        <Menu/>
        <main className="support-page settings-page">
            <Navigation active="/support" />
            <GoBackIcon/>
            <section className="content support">
                <ChatPage/>
            </section>
        </main>
    </React.Fragment>
}

export {
    SupportSettingsPage,
    SupportSettingsChatPage,
    SupportSettingsCreatePage,
};

