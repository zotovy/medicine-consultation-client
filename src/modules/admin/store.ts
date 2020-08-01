import { observable, action } from "mobx";
import axios from "axios";
import { requests } from "../../translation";
import requestStore from "./modules/Requests/store";

export const checkAuth = async (next: Function) => {
    const { isOk } = await axios
        .get(
            process.env.REACT_APP_SERVER_URL + "/api/admin/token/check-access",
            { params: { token: localStorage.getItem("adminAccessToken") } }
        )
        .then((data) => data.data)
        .catch((e) => e.response);

    if (!isOk) {
        console.log(
            "Invalid admin token were provide. Prohibiting the operation"
        );
        adminServices.logout();
        return;
    }

    const { expired } = await axios
        .get(process.env.REACT_APP_SERVER_URL + "/api/admin/token/is-expired", {
            params: { token: localStorage.getItem("adminAccessToken") },
        })
        .then((data) => data.data)
        .catch((e) => e.response);

    if (expired) {
        console.log("Admin token is experied. Trying to update.");
        const { success, tokens } = await axios
            .post(
                process.env.REACT_APP_SERVER_URL +
                    "/api/admin/token/update-tokens",
                {
                    adminid: localStorage.get("adminid"),
                    accessToken: localStorage.getItem("adminAccessToken"),
                    refreshToken: localStorage.getItem("adminRefreshToken"),
                }
            )
            .then((data) => data.data)
            .catch((e) => e.response);

        if (!success) {
            console.log("Error while updating tokens");
            adminServices.logout();
        }

        localStorage.setItem("adminAccessToken", tokens.access);
        localStorage.setItem("adminRefreshToken", tokens.refresh);
    }

    next();
};

class AdminServices {
    constructor() {
        const setup = action(() => {
            const isLogin: boolean = this.isLogin();

            if (isLogin) {
                this.accessToken =
                    localStorage.getItem("adminAccessToken") ?? "";
                this.refreshToken =
                    localStorage.getItem("adminRefreshToken") ?? "";
            }
        });
        setup();
    }

    @observable username: string = "zotovY";
    @observable uid: string = "";
    @observable redirectTo: string = "/admin/login";
    @observable accessToken: string = "";
    @observable refreshToken: string = "";
    @observable error?: string = "";

    isLogin = (): boolean => {
        if (this.uid) {
            return [12, 24].includes(this.uid.length);
        }

        const uid = localStorage.getItem("adminid");

        if (!uid) return false;

        return true;
    };

    saveUser = () => {};

    @action login = async (username: string, password: string) => {
        this.error = "";

        const response = await axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/admin/login", {
                username,
                password,
            })
            .then((data) => data.data)
            .catch((e) => e.response.data);

        if (!response.success) {
            this.error = requests.loginError;
            console.log(this.error);
            return;
        }

        if (response.success) {
            this.uid = response.uid;
            localStorage.setItem("adminid", response.admin.id);
            localStorage.setItem("adminAccessToken", response.tokens.access);
            localStorage.setItem("adminRefreshToken", response.tokens.refresh);
            this.goToAdminTrigger = !this.goToAdminTrigger;
        }
    };

    @action logout = () => {
        localStorage.removeItem("adminid");
        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("adminRefreshToken");
        this.accessToken = "";
        this.refreshToken = "";
        this.username = "";
        this.redirectTo = "/admin-login";
    };

    @action checkAdminId = async () => {
        const token = localStorage.getItem("adminAccessToken");
        const id = localStorage.getItem("adminid");

        const response = await axios
            .get(
                process.env.REACT_APP_SERVER_URL +
                    "/api/admin/token/check-access",
                {
                    params: {
                        token,
                        id,
                    },
                }
            )
            .then((data) => data.data)
            .catch((e) => e.response.data);

        console.log(response);
        return response.isOk;
    };

    @observable goToAdminTrigger: boolean = false;

    redirect = (route: string) => (this.redirectTo = route);
}

const adminServices = new AdminServices();

export default adminServices;
