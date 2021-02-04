import axios from "axios";
import TokenServices from "@/services/token-services";
import { BalanceData } from "@/modules/balance/domain";
import { authFetch } from "@/services/fetch_services";
import { TransactionPeriod } from "@/modules/balance/balance-controller";

export default class BalanceService {

    private static get routeCharacter(): "user" | "doctor" {
        if (typeof window === "undefined") return "user";
        return localStorage.getItem("isUser") === "true" ? "user" : "doctor";
    }

    private static get uid(): string {
        if (typeof window === "undefined") return "";
        const uid = localStorage.getItem("uid");
        if (!uid) throw "access_denied";
        return uid;
    }

    /**
     * @throws "access_denied"
     * @throws "not_found"
     * @throws "invalid_error"
     */
    public static fetchBalanceData = async (period: TransactionPeriod = "this_month"): Promise<BalanceData> => {
        let per = period === "last_year" ? `${new Date().getFullYear() - 1}_year` : period;
        const query = period === "all_time" ? "" : `?period=${per}`;

        const route = process.env.SERVER_URL + `/api/${BalanceService.routeCharacter}/${BalanceService.uid}/balance${query}`;
        const res = await authFetch<BalanceData>(() => axios.get(route, { headers: { auth: TokenServices.header } }));

        if (res.status === 403) throw "access_denied";
        if (res.status === 404) throw "not_found";
        if (res.status === 500) throw "invalid_error";

        return res.data;
    }
}

