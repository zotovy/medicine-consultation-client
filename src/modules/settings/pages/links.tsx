import React from "react";
import { observer } from "mobx-react"
import controller from "../controllers/link-controller"
import Navigation from "../components/navigation";
import TextField from "../../../components/text-field";
import "../styles.scss";
import ConfirmButton from "../../../components/confirm-button";

const LinksSettingsPage: React.FC = () => {
    return <main className="links-page settings-page">
        <Navigation active={4}/>
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

            <ConfirmButton onConfirm={controller.onSave} content={"Сохранить"} />
        </section>
    </main>
}

export default observer(LinksSettingsPage);