import { injectable } from "inversify";
import { observable, action, makeObservable } from "mobx";
import validationServices from "../../../services/validation-services";
import axios from "axios";
import tokenServices from "../../../services/token-services";
import storageServices from "../../../services/storage_services";
import { authFetch, EAuthFetch } from "../../../services/fetch_services";

@injectable()
export default class LoginUIStore {

    constructor() {
        makeObservable(this);
    }

    // Observables
    @observable email: string = "";
    @observable password: string = "";
    @observable showPassword: boolean = false;
    @observable error?: string;

    // Setters
    @action setEmail = (val: string) => (this.email = val);
    @action setPassword = (val: string) => (this.password = val);
    @action setError = (val?: string) => (this.error = val);
    @action toggleShowPassword = () => (this.showPassword = !this.showPassword);

    @observable goToHomeTrigger = false; // Use to trigger reaction inside login/signup component to go to home page


    @action login = async () => {
        // Remove all past errors
        this.setError();

        // Get email & password from ui
        const email = this.email;
        const password = this.password;

        // validate
        const isEmailOk = validationServices.email(email);
        const isPasswordOk = validationServices.password(password);

        if (!isEmailOk || !isPasswordOk) {
            this.setError("Неверный email или пароль");
            return;
        }

        try {
            // Send data to server
            const response = await axios.post(
                `${process.env.SERVER_URL}/api/login-user`,
                {
                    email,
                    password,
                },
            );

            // if !success --> show error
            if (!response.data.success) {
                this.setError("Неверный email или пароль");
                return;
            }

            // Set all data to localstorage & authStore
            const id = response.data.id;
            localStorage.setItem("uid", id);
            localStorage.setItem("isUser", response.data.isUser.toString());

            // Generate & save new tokens
            tokenServices.saveAccessToken(response.data.tokens.access);
            tokenServices.saveRefreshToken(response.data.tokens.refresh);

            // Fetch user based on id
            const user = await fetchUser(id);

            if (user) {
                storageServices.saveUser(user);
            }

            this.goToHomeTrigger = !this.goToHomeTrigger;
        } catch (e) {
            console.log("Some error...");
            console.log(e);
        }
    };
}

// Functions
const fetchUser = async (uid: string): Promise<UserType | DoctorType | null> => {
    const route = localStorage.getItem("isUser") == "true"
        ? `${process.env.SERVER_URL}/api/user/${uid}`
        : `${process.env.SERVER_URL}/api/doctor/${uid}`;

    const result = await authFetch(() => axios.get(route, {
        headers: {auth: tokenServices.header}
    }));
    if (result.status == EAuthFetch.Success) {
        if (result.data.user) return result.data.user as UserType;
        else return result.data.doctor as DoctorType;
    }
    return null;
};
