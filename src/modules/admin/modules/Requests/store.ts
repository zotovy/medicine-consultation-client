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

    @action triggerRequestOpenOrClose = (i: number) => {
        this.isRequestOpen[i] = !this.isRequestOpen[i];
    };

    @action triggerBookRequest = (i: number) => {
        this.isRequestBookes[i] = !this.isRequestBookes[i];
    };

    @action setIsListView = (val: boolean) => (this.isListView = val);

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
                // Trying to get new accessToken
                const { success, tokens } = await axios
                    .post(
                        process.env.REACT_APP_SERVER_URL +
                            "/api/admin/token/update-tokens",
                        {
                            adminId: localStorage.getItem("adminid"),
                            accessToken: localStorage.getItem(
                                "adminAccessToken"
                            ),
                            refreshToken: localStorage.getItem(
                                "adminRefreshToken"
                            ),
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

                const response = await makeRequest();

                console.log(response);

                if (response.success) {
                    this.requests = response.requests;
                    adminServices.redirect("/admin");
                } else {
                    adminServices.logout();
                }
            } else {
                adminServices.logout();
            }
        } else {
            this.requests = response.requests;
        }
    };
}

export default new Requests();
