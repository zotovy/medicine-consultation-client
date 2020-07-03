import { observable, action } from "mobx";

class LoginUIStore {
    // Observables
    @observable email: string = "";
    @observable password: string = "";
    @observable rememberMe: boolean = false;
    @observable error?: string;

    // Setters
    @action setEmail = (val: string) => (this.email = val);
    @action setPassword = (val: string) => (this.password = val);
    @action toggleRememberMe = () => {
        this.rememberMe = !this.rememberMe;
    };
    @action setError = (val?: string) => (this.error = val);
}

export default new LoginUIStore();
