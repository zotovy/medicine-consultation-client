import { AxiosResponse } from "axios";
import tokenServices from "./token-services";

const authFetch = async <T = any>(
    f: () => Promise<AxiosResponse<any>>
): Promise<AFRes<T>> => {
    try {
        let data = await f().catch((e) => e?.response);

        if (data.status === 403 || data.status === 412) {
            const uid = localStorage.getItem("uid");

            if (!uid)
                return {
                    code: data.status,
                    status: EAuthFetch.Unauthorized,
                    data: {} as T,
                };

            await tokenServices.getAndUpdateNewAccessToken();
            data = await f().catch((e) => e?.response);

            if (data.status === 403 || data.status === 412)
                return {
                    code: data.status,
                    status: EAuthFetch.Unauthorized,
                    data: {} as T,
                };
        }

        return {
            code: data.status,
            status: EAuthFetch.Success,
            data: data.data as T,
        };
    } catch (e) {
        return {
            code: 500,
            status: EAuthFetch.Error,
            data: {} as T,
        };
    }
};

export enum EAuthFetch {
    Success ,
    Unauthorized,
    Error,
}

export type AFRes<T = any> = {
    code: number,
    status: EAuthFetch;
    data: T;
};

export { authFetch };
