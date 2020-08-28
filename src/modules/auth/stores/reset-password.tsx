import { observable } from "mobx";
import { checkPassword } from "../helper";

class ResetPasswordFromEmailСontroller {
    @observable email: string = "";
    @observable emailError: string | undefined = undefined;
    @observable password1: string = "";
    @observable password2: string = "";
    @observable passwordError: string | undefined = undefined;

    validateEmail = (): boolean => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.email.toLowerCase());
    }

}

export default new ResetPasswordFromEmailСontroller();