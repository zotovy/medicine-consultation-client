import { action, observable } from "mobx";
import UserStore from "./userStore";
import { authFetch, EAuthFetch } from "@/services/fetch_services";
import axios from "axios";
import token_services from "@/services/token-services";
import validate_services from "@/services/validation-services";

class NotificationsController {
    // General
    @observable status: "user" | "doctor" = "doctor";
    @observable isLoading: boolean = true;
    @observable isLoadingSave: boolean = false;

    @observable email: string = 'a@mail.com';
    @observable emailError: string | undefined;
    @observable needNotifications: boolean = false;
    @observable canDoMailing: boolean = false;

    fetchNotifications = async () => {
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!uid || isUser == null) throw "logout";

        if (UserStore.user !== null) {
            action(() => {
                if (!UserStore.user) return;
                this.isLoading = false;
                this.email = UserStore.user.notificationEmail;
                this.needNotifications = UserStore.user.sendNotificationToEmail;
                this.canDoMailing = UserStore.user.sendMailingsToEmail;
            })();
            return;
        }

        this.isLoading = true;
        const route = isUser === "true" ? `/api/user/${uid}` : `/api/doctor/${uid}`
        const result = await authFetch(() => axios.get(
            process.env.REACT_APP_SERVER_URL + route,
            {
                headers: {
                    auth: token_services.header
                }
            }
        ));
        this.isLoading = false;

        if (!result || result.status === EAuthFetch.Error) throw "error";
        else if (result.status === EAuthFetch.Unauthorized) throw "logout";
        else {
            action(() => {
                if (!result) throw "error";

                let user;
                if (isUser === "true") user = result.data.user;
                else user = result.data.doctor;

                UserStore.user = user;
                this.email = user.notificationEmail;
                this.needNotifications = user.sendNotificationToEmail;
                this.canDoMailing = user.sendMailingsToEmail;
            })();
        }
    }

    saveAccountSettings = async () => {
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!uid || isUser == null) throw "logout";

        // Validate
        if (!validate_services.email(this.email)) {
            this.emailError = "Неверный email";
            return;
        }

        const route = isUser ? `/api/user/${uid}` : `/api/doctor/${uid}`

        this.isLoadingSave = true;
        const res = await authFetch(() => axios.put(
            process.env.REACT_APP_SERVER_URL + route,
            {
                id: uid,
                notificationEmail: this.email,
                sendNotificationToEmail: this.needNotifications,
                sendMailingsToEmail: this.canDoMailing,
            },
            {
                headers: {
                    auth: token_services.header
                },
            }));

        this.isLoadingSave = false;
        if (res.status === EAuthFetch.Error) throw "error";
        else if (res.status === EAuthFetch.Unauthorized) throw "login";
        else if (res.data.error && res.data.error === "not_validated_error") {
            const errs = res.data.errors;
            if (errs.email === "unique_error") this.emailError = "Этот email уже используется";
        }
    }

}

export default new NotificationsController();