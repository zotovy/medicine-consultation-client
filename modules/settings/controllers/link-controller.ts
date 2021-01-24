import { action, observable } from "mobx";
import UserStore from "./userStore";
import { authFetch, EAuthFetch } from "@/services/fetch_services";
import axios from "axios";
import token_services from "@/services/token-services";

class LinkController {

    @observable loading: boolean = true;
    @observable saveLoading: boolean = true;

    @observable vk? : string;
    @observable instagram? : string;
    @observable telegram? : string;
    @observable whatsApp? : string;
    @observable viber? : string;
    @observable email? : string;

    fetchUser = async () : Promise<void> => {
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!uid || isUser == null) throw "logout";

        if (UserStore.user !== null && (UserStore as unknown as DoctorType).rating != null) {
            this._mapUserToClass(UserStore.user as DoctorType);
            this.loading = false;
            return;
        }

        if (!this.loading) this.loading = true;
        const result = await authFetch(() => axios.get(
            process.env.REACT_APP_SERVER_URL + `/api/doctor/${uid}`,
            {
                headers: {
                    auth: token_services.header
                }
            }
        ));
        this.loading = false;

        if (!result || result.status === EAuthFetch.Error) throw "error";
        else if (result.status === EAuthFetch.Unauthorized) throw "logout";
        else {
            console.log(result.data);
            action(() => {
                if (!result) return;

                this._mapUserToClass(result.data.doctor);
                UserStore.user = result.data.doctor;
            })();
        }
    }

    @action private _mapUserToClass = (doctor : DoctorType) => {
        this.vk = doctor.vkLink;
        this.instagram = doctor.instagramLink;
        this.telegram = doctor.telegramLink;
        this.whatsApp = doctor.whatsAppLink;
        this.viber = doctor.viberLink;
        this.email = doctor.emailLink;
    }

    @action onSave = async () : Promise<void> => {
        const uid = localStorage.getItem("uid");

        const result = await authFetch(() => axios.post(
            process.env.REACT_APP_SERVER_URL + `/api/doctor/${uid}/update-links`,
            {
                vk: this.vk ?? "",
                instagram: this.instagram ?? "",
                telegram: this.telegram ?? "",
                whatsApp: this.whatsApp ?? "",
                viber: this.viber ?? "",
                email: this.email ?? "",
            },
            {
                headers: {
                    auth: token_services.header
                }
            }
        ));
        this.saveLoading = true;
        if (!result || result.status === EAuthFetch.Error) throw "error";
        else if (result.status === EAuthFetch.Unauthorized) throw "logout";
    }

    // Used to go back
    errorCb = () => {}
}

export default new LinkController();