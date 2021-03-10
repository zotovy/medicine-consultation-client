import axios from "axios";
import TokenServices from "@/services/token-services";
import { authFetch, EAuthFetch } from "@/services/fetch_services";

export default class SupportManager {

    static async fetchConsultation(uid: string): Promise<Consultation[]> {
        const who = localStorage.getItem("isUser") === "true" ? "user" : "doctor";

        const res = await authFetch(() => axios.get<{ appoints: IAppointment[] }>(
            process.env.SERVER_URL + `/api/${who}/${uid}/appoints`,
            {
                headers: { auth: TokenServices.header }
            }
        ));

        if (res.status === EAuthFetch.Unauthorized) throw "logout";
        if (res.data.error) throw "invalid_error";

        // Convert string date --> Date obj
        res.data.appoints.forEach((e: IAppointment, i: number) => {
            res.data.appoints[i].consultation.date =  new Date((e.consultation as Consultation).date);
        });

        return res.data.appoints.map((e: IAppointment) => e.consultation);
    }

}
