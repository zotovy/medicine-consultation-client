import React, { useEffect } from "react";
import { NextPage } from "next";
import { observer } from "mobx-react"
import LinkController from "../controllers/link-controller"
import Menu from "@/components/menu";
import TextField from "@/components/text-field";
import ConfirmButton from "@/components/confirm-button";
import Navigation from "../components/navigation";
import SettingsLoadingComponent from "../components/loading";
import GoBackIcon from "../components/go-back-icon";
import { useInjection, TYPES } from "../../../container";


const LinksSettingsPage: NextPage = () => {
    const controller = useInjection<LinkController>(TYPES.linkController)

    useEffect(() => {
        controller.fetchUser();
    }, []);

    if (controller.loading) {
        return <SettingsLoadingComponent active="/links"/>
    }

    return <React.Fragment>
        <Menu/>
        <main className="links-page settings-page">
            <Navigation active="/links"/>
            <GoBackIcon/>
            <section className="content links-page">
                <div className="row">
                    <TextField
                        onChange={(v) => controller.vk = v}
                        field={"ВКонтакте"}
                        hint={"ВКонтакте"}
                        value={controller.vk}
                    />
                    <div className="row-gap"/>
                    <TextField
                        onChange={(v) => controller.instagram = v}
                        field={"Instagram"}
                        hint={"Instagram"}
                        value={controller.instagram}
                    />
                </div>

                <div className="row">
                    <TextField
                        onChange={(v) => controller.telegram = v}
                        field={"Телеграм"}
                        hint={"Телеграм"}
                        value={controller.telegram}
                    />
                    <div className="row-gap"/>
                    <TextField
                        onChange={(v) => controller.whatsApp = v}
                        field={"WhatsApp"}
                        hint={"WhatsApp"}
                        value={controller.whatsApp}
                    />
                </div>

                <div className="row">
                    <TextField
                        onChange={(v) => controller.viber = v}
                        field={"Viber"}
                        hint={"Viber"}
                        value={controller.viber}
                    />
                    <div className="row-gap"/>
                    <TextField
                        onChange={(v) => controller.email = v}
                        field={"Email"}
                        hint={"Email"}
                        value={controller.email}
                    />
                </div>

                <ConfirmButton onConfirm={controller.onSave} content={"Сохранить"}/>
            </section>
        </main>
    </React.Fragment>
}

export default observer(LinksSettingsPage)