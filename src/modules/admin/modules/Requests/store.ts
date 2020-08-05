import { observable, action } from "mobx";
import axios from "axios";
import adminServices from "../../store";

class Requests {
    constructor() {
        this.fetchRequests();
    }

    @observable isRequestOpen: boolean[] = [];
    @observable isRequestBookes: boolean[] = [];
    @observable requests: IBecomeDoctor[] = [];
    @observable isListView: boolean = false;

    @observable isCloseModalWindowOpen: boolean = false;
    @observable isSubmitModalWindowOpen: boolean = false;
    @observable userDataOnModalWindow: { name?: string; id?: string } = {};
    @observable requestOperationError: string | null = null;

    @action triggerRequestOpenOrClose = (i: number) => {
        this.isRequestOpen[i] = !this.isRequestOpen[i];
    };

    @action triggerBookRequest = (i: number) => {
        this.isRequestBookes[i] = !this.isRequestBookes[i];
    };

    @action setIsListView = (val: boolean) => (this.isListView = val);

    private updateTokens = async (after: Function): Promise<any> => {
        // Trying to get new accessToken
        const { success, tokens } = await axios
            .post(
                process.env.REACT_APP_SERVER_URL +
                    "/api/admin/token/update-tokens",
                {
                    adminId: localStorage.getItem("adminid"),
                    accessToken: localStorage.getItem("adminAccessToken"),
                    refreshToken: localStorage.getItem("adminRefreshToken"),
                }
            )
            .then((data) => data.data)
            .catch((e) => e.response.data);

        if (!success) {
            console.log("Error while updating tokens");
            adminServices.logout();
            return;
        }

        localStorage.setItem("adminAccessToken", tokens.access);
        localStorage.setItem("adminRefreshToken", tokens.refresh);

        await after();
    };

    @action fetchRequests = async () => {
        const makeRequest = async () => {
            return await axios
                .get(
                    process.env.REACT_APP_SERVER_URL +
                        "/api/admin/become-doctor-requests",
                    {
                        headers: {
                            auth:
                                "Bearer " +
                                localStorage.getItem("adminAccessToken"),
                        },
                    }
                )
                .then((data) => data.data)
                .catch((e) => e.response.data);
        };

        const response = await makeRequest();

        if (!response.success) {
            if (response.error === "not_authorize") {
                await this.updateTokens(async () => {
                    const response = await makeRequest();

                    console.log("Update tokens", response);

                    if (response.success) {
                        this.requests = response.requests;
                        // adminServices.redirect("/admin");
                    } else {
                        adminServices.logout();
                    }
                });
            } else {
                adminServices.logout();
            }
        } else {
            this.requests = response.requests;
        }
    };

    @action openModalWndow = (data: { name: string; id: string }) => {
        this.isCloseModalWindowOpen = true;
        this.userDataOnModalWindow = { ...data };
    };

    @action undoModalWindow = () => {
        this.isCloseModalWindowOpen = false;
        this.isSubmitModalWindowOpen = false;
    };
    @action removeRequest = async () => {
        this.isCloseModalWindowOpen = false;
        this.requests = this.requests.filter(
            (e) => e.id != this.userDataOnModalWindow.id
        );

        const errorText = "Произошла какая-то ошибка. Повторите позднее";

        const makeRequest = async (): Promise<boolean> => {
            return await axios
                .delete(
                    process.env.REACT_APP_SERVER_URL +
                        "/api/admin/become-doctor-request/remove/" +
                        this.userDataOnModalWindow.id,
                    {
                        headers: {
                            auth:
                                "Bearer " +
                                localStorage.getItem("adminAccessToken"),
                        },
                    }
                )
                .then((data) => data.data.ok ?? false)
                .catch((e) => e.response.data.ok);
        };

        const ok = await makeRequest();

        if (!ok) {
            await this.updateTokens(async () => {
                const ok = await makeRequest();

                if (!ok) {
                    this.requestOperationError = errorText;
                }
            });
        }
    };

    @action submitRequest = async () => {
        this.isCloseModalWindowOpen = false;
        this.requests = this.requests.filter(
            (e) => e.id != this.userDataOnModalWindow.id
        );

        const makeRequest = async (): Promise<boolean> => {
            return await axios
                .post(
                    process.env.REACT_APP_SERVER_URL +
                        "/api/admin/become-doctor-request/submit/" +
                        this.userDataOnModalWindow.id,
                    {},
                    {
                        headers: {
                            auth:
                                "Bearer " +
                                localStorage.getItem("adminAccessToken"),
                        },
                    }
                )
                .then((data) => data.data.ok ?? false)
                .catch((e) => e.response.data.ok);
        };

        const errorText = "Произошла какая-то ошибка. Повторите позднее";

        const ok = await makeRequest();

        if (!ok) {
            await this.updateTokens(async () => {
                const ok = await makeRequest();

                this.isSubmitModalWindowOpen = false;

                if (!ok) {
                    this.requestOperationError = errorText;
                }
            });
        }
    };
}

export default new Requests();
