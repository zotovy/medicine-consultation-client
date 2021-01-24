import { action, observable, makeObservable } from "mobx";
import { injectable } from "inversify";
import UserStore from "./userStore";
import { authFetch, EAuthFetch } from "@/services/fetch_services";
import axios from "axios";
import token_services from "@/services/token-services";

@injectable()
export default class ReviewsController {

    constructor() {
        makeObservable(this);
    }

    // General
    @observable status: "user" | "doctor" = "doctor";
    @observable isLoading: boolean = true;

    // Reviews
    @observable reviews : Review[] = [];

    fetchReviews = async () : Promise<void> => {
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!uid || isUser == null) throw "logout";

        if (UserStore.reviews !== null) {
            this.reviews = UserStore.reviews;
            return;
        }

        this.isLoading = true;

        await action(async () => {
            const result = await authFetch(() => axios.get(
                process.env.SERVER_URL + `/api/user/${uid}/reviews?tile=true&isUser=${isUser}`,
                {
                    headers: { auth: token_services.header },
                }
            ));

            this.isLoading = false;
            if (!result || result.status === EAuthFetch.Error) throw "error";
            else if (result.status === EAuthFetch.Unauthorized) throw "logout";
            else {
                this.reviews = result.data.reviews;
                UserStore.reviews = this.reviews;
            }
        })();
    }

}
