import { authFetch, EAuthFetch } from "@/services/fetch_services";
import axios from "axios";
import tokenServices from "@/services/token-services";

export default class API {

    /**
     * @throws "error"
     * @throws "unauthorized"
     */
    public static async fetchConsultation(id: string): Promise<Consultation> {
        const response = await authFetch(() =>
                axios.get(
                        process.env.SERVER_URL + "/api/consultation/" + id,
                        {
                            headers: {
                                auth: tokenServices.header,
                            },
                        }
                )
        );

        if (response.status === EAuthFetch.Error) throw "error";
        if (response.status === EAuthFetch.Unauthorized) throw "unauthorized";

        // Convert string date --> Date obj
        response.data.consultation.date = new Date(response.data.consultation.date);

        return response.data.consultation;
    }
}
