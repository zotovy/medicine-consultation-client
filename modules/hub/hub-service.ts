import { authFetch } from "@/services/fetch_services";
import axios from "axios";
import TokenServices from "@/services/token-services";
import {
    GetAppointByIdResponse,
    GetAppointRequestsResponse,
    GetAppointsDatesResponse,
    GetAppointsResponse,
    PostConfirmAppointRequest, PostRejectAppointRequest
} from "@/modules/hub/types";

export default class HubService {

    /**
     * @throws GetAppointsDatesResponse.error
     * @param id
     * @param date
     */
    public static fetchAppointmentsDates = async (id: string, date: Date): Promise<Date[]> => {

        // Change Date obj --> "MM.YYYY" format
        let month = (date.getMonth() + 1).toString();
        const year = date.getFullYear();
        if (month.length === 1) month = "0" + month;
        const stringDate = `${month}.${year}`;

        const response = await authFetch<GetAppointsDatesResponse>(() => axios.get(
            process.env.SERVER_URL + `/api/doctor/get-appoints-dates/${stringDate}`,
            { headers: { auth: TokenServices.header } },
        ))

        if (!response.data.success) {
            throw response.data.error;
        }

        return response.data.dates.map(e => new Date(e));
    }

    /**
     * @throws GetAppointsResponse.error
     * @param id
     * @param date
     * @param isUser
     */
    public static fetchAppointments = async (id: string, isUser: boolean, date: Date = new Date()): Promise<IAppointment[]> => {
        // Change Date obj --> "DD.MM.YYYY" format
        let day = date.getDate().toString(),
            month = (date.getMonth() + 1).toString();
        const year = date.getFullYear();
        if (day.length === 1) day = "0" + day;
        if (month.length === 1) month = "0" + month;
        const query = isUser ? "" : `?numericDate=${day}.${month}.${year}`;

        const response = await authFetch<GetAppointsResponse>(() => axios.get(
            process.env.SERVER_URL + `/api/${isUser ? "user" : "doctor"}/${id}/appoints${query}`,
            { headers: { auth: TokenServices.header } }
        ));

        // Error handling
        if (!response.data.success) {
            throw response.data.error;
        }

        // Convert string dates to Date obj
        return response.data.appoints.map(e => ({
            ...e,
            from: new Date(e.from),
            to: new Date(e.to),
            birthday: new Date(e.birthday),
        }));
    }

    /**
     * @throws GetAppointRequestsResponse.error
     * @param id
     * @param isUser
     */
    public static fetchAppointmentRequests = async (id: string, isUser: boolean): Promise<IAppointRequest[]> => {
        const response = await authFetch<GetAppointRequestsResponse>(() => axios.get(
            process.env.SERVER_URL + `/api/${isUser ? "user" : "doctor"}/${id}/appoints-requests`,
            { headers: { auth: TokenServices.header } },
        ));

        // Error handling
        if (!response.data.success) {
            throw response.data.error;
        }

        // Convert string dates to Date obj
        return response.data.requests.map(e => ({
            ...e,
            createdAt: new Date(e.createdAt),
            appointment: typeof e.appointment !== "string"
                ? {
                    ...e.appointment,
                    from: new Date(e.appointment.from),
                    to: new Date(e.appointment.to)
                }
                : e.appointment,
        }));
    }

    private static appointRequestAction = async (id: string, action: "confirm" | "reject"): Promise<void> => {
        const uid = localStorage.getItem("uid");
        const response = await authFetch<PostConfirmAppointRequest>(() => axios.post(
            process.env.SERVER_URL + `/api/doctor/${uid}/appoint/${id}/${action}`,
            {},
            { headers: { auth: TokenServices.header } }
        ));

        // Error handling
        if (!response.data.success) {
            throw response.data.error;
        }
    }

    /**
     * @throws PostConfirmAppointRequest.error
     * @param id
     */
    public static confirmAppointRequest = async (id: string): Promise<void> => {
        return HubService.appointRequestAction(id, "confirm")
    }

    /**
     * @throws PostRejectAppointRequest.error
     * @param id
     */
    public static rejectAppointRequest = async (id: string): Promise<void> => {
        return HubService.appointRequestAction(id, "reject")
    }

    /**
     * @throws PostRejectAppointRequest.error
     * @param id
     * @param isUser
     */
    public static rejectAppoint = async (id: string, isUser: boolean): Promise<void> => {
        const uid = localStorage.getItem("uid");

        const response = await authFetch<PostRejectAppointRequest>(() => axios.post(
            process.env.SERVER_URL + `/api/${isUser ? "user" : "doctor"}/${uid}/appoint/${id}/reject`,
            {},
            { headers: { auth: TokenServices.header } }
        ));

        // Error handling
        if (!response.data.success) {
            throw response.data.error;
        }
    }


    public static fetchAppointById = async (id: string): Promise<IAppointment> => {
        const response = await authFetch<GetAppointByIdResponse>(() => axios.get(
            process.env.SERVER_URL + `/api/appoint/${id}`,
            { headers: { auth: TokenServices.header } }
        ));

        // Error handling
        if (!response.data.success) {
            throw response.data.error;
        }

        // Change date string --> Date Obj
        return {
            ...response.data.appoint,
            from: new Date(response.data.appoint.from),
            to: new Date(response.data.appoint.to),
            birthday: new Date(response.data.appoint.birthday),

        };
    }
}
