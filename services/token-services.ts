import moment from "moment";
import axios from "axios";

export default class tokenServices {
    // Settings
    static accessTokenLifetime: number = 1800;
    static refreshTokenLifetime: number = 31536000;

    // Api
    static accessTokenLeftTime = () => tokenServices._secondsToUpdate("accessToken");
    static refreshTokenLeftTime = () => tokenServices._secondsToUpdate("refreshToken");

    static get header(): string {
        return `Bearer ${tokenServices._getAccessToken()}`;
    }

    static saveAccessToken(token: string): void {
        if (typeof window !== "undefined") localStorage.setItem("accessToken", token);

        const now = moment();
        if (typeof window !== "undefined") localStorage.setItem("accessTokenSetDate", now.toISOString());
    }

    static saveRefreshToken(token: string): void {
        if (typeof window !== "undefined") localStorage.setItem("refreshToken", token);

        const now = moment();
        if (typeof window !== "undefined") localStorage.setItem("refreshTokenSetDate", now.toISOString());
    }

    static isLogin(): boolean {
        const accessToken = typeof window === "undefined"
            ? null
            : localStorage.getItem("accessToken");

        if (accessToken) {
            return true;
        }

        return false;
    }

    static checkAndUpdateToken = async (): Promise<boolean | null> => {
        if (tokenServices._needRefreshAccessToken()) {
            const token = await tokenServices._getNewAccessToken();

            console.log(token);
            if (token) {
                tokenServices.saveAccessToken(token ?? "");
            }
        }

        return !tokenServices._needRefreshRefreshToken();
    };

    static generateNewTokens = async (id: string): Promise<void> => {
        const responce = await axios.post(
            `${process.env.SERVER_URL}/api/generate-token`,
            { id: id }
        );

        if (!responce.data.success) {
            console.log("!success");

            return;
        }

        const accessToken = responce.data.tokens.access;
        const refreshToken = responce.data.tokens.refresh;

        tokenServices.saveAccessToken(accessToken);
        tokenServices.saveRefreshToken(refreshToken);
    };

    static removeTokens = () => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshTokenSetDate");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accessTokenSetDate");
    };

    static logout = () => {
        tokenServices.removeTokens();
        localStorage.removeItem("uid");
        localStorage.removeItem("isUser");
    }

    // Core
    private static  _needRefreshAccessToken(): boolean | null {
        const leftToLive = tokenServices._secondsToUpdate("accessTokenSetDate");
        return leftToLive != null
            ? leftToLive >= tokenServices.accessTokenLifetime
            : null;
    }

    private static _needRefreshRefreshToken(): boolean | null {
        const leftToLive = tokenServices._secondsToUpdate("refreshTokenSetDate");

        return leftToLive != null ? leftToLive <= 0 : null;
    }

    private static _getAccessToken = (): string | null => typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    private static  _getRefreshToken = (): string | null => typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;

    private static  _secondsToUpdate(tokenKey: string): number | null {
        const setDate = typeof window === "undefined"
            ? null
            : localStorage.getItem(tokenKey);

        if (!setDate) return null;

        const date = moment(setDate);
        const now = moment();
        const diff = moment.duration(now.diff(date));

        return diff.asSeconds();
    }

    private  static _getNewAccessToken = async (): Promise<any | null> => {
        if (tokenServices._needRefreshRefreshToken()) {
            return null;
        }

        const refreshToken = tokenServices._getRefreshToken();
        const accessToken = tokenServices._getAccessToken();
        const userId = typeof window === "undefined"
            ? null
            : localStorage.getItem("uid");

        if (!refreshToken || !accessToken || !userId) return null;

        const responce = await axios
            .post(`${process.env.SERVER_URL}/api/token`, {
                accessToken,
                refreshToken,
                userId,
            })
            .catch((e) => {
                console.log(e.response);
                return e.response;
            });

        if (!responce?.data.success || !responce?.data.tokens) return null;

        return responce?.data.tokens;
    };

    static getAndUpdateNewAccessToken = async (): Promise<void> => {
        const tokens = await tokenServices._getNewAccessToken();
        if (tokens) {
            tokenServices.saveAccessToken(tokens.access ?? "");
            tokenServices.saveRefreshToken(tokens.refresh ?? "");
        }
    };
}

