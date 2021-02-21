import axios from "axios";
import { WriteReviewRequest } from "@/modules/consultations/types";
import { authFetch } from "@/services/fetch_services";
import TokenServices from "@/services/token-services";

export default class ConsultationManager {

    /**
     * @throws logout
     * @throws invalid_error
     */
    public static async fetchConsultation(id: string): Promise<Consultation> {
        const res = await authFetch(() => axios.get(
            process.env.SERVER_URL + `/api/consultation/${id}`,
            { headers: { auth: TokenServices.header } },
        ));

        if (res.data.error) {
            switch (res.code) {
                case 403:
                    throw "logout"
                default:
                    throw "invalid_error"
            }
        }

        return res.data.consultation;
    }

    /**
     * @throws not_validated
     * @throws logout
     * @throws not_found
     * @throws access_denied
     * @throws invalid_error
     */
    public static async writeReview(request: WriteReviewRequest): Promise<void> {
        const res = await authFetch(() => axios.post(
            process.env.SERVER_URL + `/api/doctor/${request.doctorId}/review`,
            request,
            { headers: { auth: TokenServices.header } },
        ));

        if (res.data.error) {
            switch (res.code) {
                case 400:
                    throw "not_validated"
                case 403:
                    throw "logout"
                case 404:
                    throw "not_found"
                case 412:
                    throw "access_denied"
                default:
                    throw "invalid_error"
            }
        }
    }

}
