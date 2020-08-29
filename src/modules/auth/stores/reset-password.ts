import { observable } from "mobx";
import axios from "axios";
import { checkPassword } from "../helper";

class ResetPasswordFromEmailСontroller {
    @observable email: string = "";
    @observable emailError: string | undefined = undefined;
    @observable password1: string = "";
    @observable password2: string = "";
    @observable passwordError: string | undefined = undefined;
    @observable successOperation: boolean = false;

    private validateEmail = (): boolean => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.email.toLowerCase());
    };

    sendResetPasswordEmail = async (): Promise<void> => {
        this.emailError = "";

        const ok = this.validateEmail();

        if (!ok) {
            this.emailError = "Неверно форматирован email";
            return;
        }

        const response = await axios
            .post(
                process.env.REACT_APP_SERVER_URL +
                    "/api/send-reset-password-email",
                { email: this.email }
            )
            .then((data) => data?.data)
            .catch((e) => e.response?.data);

        if (!response) {
            this.emailError =
                "Произошла не придвиденная ошибка. Попробуйте повторить позже.";
            return;
        }

        if (!response.success) {
            if (response.error === "no_user_found") {
                this.emailError = "Пользователь с таким email не найден:(";
            } else {
                this.emailError =
                    "Произошла не придвиденная ошибка. Попробуйте повторить позже.";
            }

            return;
        }

        this.successOperation = true;
    };

    sendResetPasswordRequest = async (id: string): Promise<void> => {
        this.passwordError = "";

        const { ok, error } = checkPassword(this.password1, this.password2);

        if (!ok) {
            this.passwordError = error;
            return;
        }

        const response = await axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/reset-password", {
                requestId: id,
                password: this.password1,
            })
            .then((data) => data?.data)
            .catch((e) => e.response?.data);

        if (!response) {
            this.passwordError =
                "Произошла не придвиденная ошибка. Попробуйте повторить позже.";
            return;
        }

        if (!response.success) {
            if (response.error === "expired_error") {
                this.passwordError =
                    "Срок действия запрос истек. Запросите новый для смены пароля";
            } else if (response.error === "invalid_password") {
                this.passwordError =
                    "Пароль должен быть от 8 символов в длину, содержать числа и буквы латинского алфавита";
            } else {
                this.passwordError =
                    "Произошла не придвиденная ошибка. Попробуйте повторить позже.";
            }

            return;
        }

        this.successOperation = true;
        setTimeout(() => (this.successOperation = false), 5000);
    };
}

export default new ResetPasswordFromEmailСontroller();
