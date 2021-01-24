import React, { useEffect } from "react";
import { NextPage } from "next";
import { observer } from "mobx-react";

import NotificationsController from "../controllers/notifications-controller";
import Menu from "@/components/menu";
import Navigation from "../components/navigation";
import TextField from "@/components/text-field";
import Checkbox from "@/components/checkbox";
import ConfirmButton from "@/components/confirm-button"
import LoadingLine from "@/components/loading-line";
import SettingsLoadingComponent from "../components/loading";
import GoBackIcon from "../components/go-back-icon";
import withController from "@/utils/inject";
import { useInjection, TYPES } from "../../../container";


const NotificationPage : NextPage = () => {
    const controller = useInjection<NotificationsController>(TYPES.notificationsController)

    useEffect(() => {
        controller.fetchNotifications();
    }, []);

    if (controller.isLoading) {
        return <SettingsLoadingComponent active="/notifications"/>
    }
    return <React.Fragment>
        <Menu/>
        <main className="notifications-page settings-page">
            {
                controller.isLoadingSave ? <LoadingLine/> : <React.Fragment/>
            }
            <GoBackIcon/>
            <Navigation active="/notifications" />
            <section className="content notifications">
                <TextField
                    onChange={(v) => controller.email = v}
                    value={controller.email}
                    field="Email для уведомлений"
                    error={controller.emailError}
                />

                <Checkbox
                    onChange={() => controller.needNotifications = !controller.needNotifications}
                    label="Присылать уведомления о консультациях"
                    checked={controller.needNotifications}
                />
                <Checkbox
                    onChange={() => controller.canDoMailing = !controller.canDoMailing}
                    label="Рассылка по электронной почте"
                    checked={controller.canDoMailing}
                />

                <ConfirmButton onConfirm={controller.saveAccountSettings} content="Сохранить" />
            </section>
        </main>
    </React.Fragment>

}

export default withController(observer(NotificationPage), "notificationsController");