import { observable, action } from "mobx";
import axios from "axios";
import { authFetch } from "@/services/fetch_services";
import validationService from "@/services/validation-services";
import tokenServices from "@/services/token-services";

class PasswordController {
    // UI
    oldPassword: string = "";
    newPassword: string = "";
    confirmNewPassword: string = "";

    @observable oldPasswordError?: string;
    @observable newPasswordError?: string;
    @observable confirmNewPasswordError?: string;

    // Callback
    redirectToLogin = () => {
    }

    save = async () => {
        if (!this._validate()) return;

        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser") === "true";
        const response = await authFetch<Response>(() => axios.post(
            process.env.REACT_APP_SERVER_URL + `/api/user/${uid}/update-password`,
            {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                isUser,
            },
            { headers: { auth: tokenServices.header } }
        ));

        if (!response.data.success) this._handleError(response.data.error);
        // todo: may add some more reactivity to user by showing "Hey! Your password have been changed!!!"
    }

    @action private _handleError = (error: Error): void => {
        console.error(error);
        switch (error) {
            case "password_doesnt_meet_requirements":
                this.newPasswordError = "Пароль слишком легкий";
                break;
            case "invalid_old_password":
                this.oldPasswordError = "Неверный пароль";
                break;
            case "no_user_found":
                this.redirectToLogin();
                break;
            case "invalid_token":
                this.redirectToLogin();
                break;
            case "not_authorized":
                this.redirectToLogin();
                break;
            default:
                this.redirectToLogin();
                break;
        }
    }

    @action private _validate = (): boolean => {
        this.oldPasswordError = undefined;
        this.newPasswordError = undefined;
        this.confirmNewPasswordError = undefined;

        if (!validationService.password(this.oldPassword)) this.oldPasswordError = "Неверный пароль";
        if (!validationService.password(this.newPassword)) this.newPasswordError = "Пароль слишком легкий";
        if (this.confirmNewPassword != this.newPassword) this.confirmNewPasswordError = "Пароли не совпадают";
        return !this.confirmNewPasswordError && !this.newPasswordError && !this.oldPasswordError;
    }
}

type Error =
    | "password_doesnt_meet_requirements"
    | "invalid_old_password"
    | "no_user_found"
    | "not_authorized"
    | "invalid_token";

type Response = SuccessResponse | FailedResponse;
type SuccessResponse = { success: true };
type FailedResponse = { success: false, error: Error };

export default new PasswordController();