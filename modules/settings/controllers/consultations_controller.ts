import { action, observable, makeObservable } from "mobx";
import { authFetch, EAuthFetch } from "@/services/fetch_services";
import axios from "axios";
import token_services from "@/services/token-services";
import UserStore from "./userStore";
import TranslateServices from "@/services/translate_services";

export default class ConsultationController {

    constructor() {
        makeObservable(this);
    }

    // General
    @observable status: "user" | "doctor" = "doctor";
    @observable isLoading: boolean = true;

    // Consultations
    @observable consultations: Consultation[] = [];
    @observable isActive: boolean = false;
    @observable selectedConsultation: number = -1;

    get selectedCons() : Consultation {
        return this.consultations[this.selectedConsultation];
    }

    fetchConsultations = async () : Promise<void> => {
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!uid || isUser == null) throw "logout";

        if (UserStore.consultations !== null) {
            this.consultations = UserStore.consultations;
            return;
        }

        this.isLoading = true;

        console.log("fetching", process.env.SERVER_URL + `/api/consultation/user/${uid}?isUser=${isUser}`);
        await action(async () => {
            const result = await authFetch(() => axios.get(
                process.env.SERVER_URL + `/api/consultation/user/${uid}?isUser=${isUser}`,
                {
                    headers: { auth: token_services.header },
                }
                ));

            this.isLoading = false;
            if (!result || result.status === EAuthFetch.Error) throw "error";
            else if (result.status === EAuthFetch.Unauthorized) throw "logout";
            else {
                result.data.consultations?.forEach((e : any, i : number) => {
                    if (e && e.doctorId && e.doctorId.speciality) {
                        result.data.consultations[i].doctorId.speciality =
                            // @ts-ignore
                            TranslateServices.translateSpeciality[e.doctorId.speciality];
                    }

                    if (e && e.date) {
                        e.date = new Date(e.date);
                    }
                });
                this.consultations = result.data.consultations;
                UserStore.consultations = result.data.consultations;
            }
        })();
    }

    @action showConsultationNode = (i : number) : void => {
        this.selectedConsultation = i;
        this.isActive = true;
    }

}