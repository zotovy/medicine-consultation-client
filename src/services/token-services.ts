import moment from "moment";
import axios from "axios";

class TokenServices {
    // Settings
    accessTokenLifetime: number = 1800;
    refreshTokenLifetime: number = 31536000;

    // Api
    accessTokenLeftTime = () => this._secondsToUpdate("accessToken");
    refreshTokenLeftTime = () => this._secondsToUpdate("refreshToken");

    saveAccessToken(token: string) {
        localStorage.setItem("accessToken", token);

        const now = moment();
        localStorage.setItem("accessTokenSetDate", now.toISOString());
    }

    saveRefreshToken(token: string) {
        localStorage.setItem("refreshToken", token);

        const now = moment();
        localStorage.setItem("refreshTokenSetDate", now.toISOString());
    }

    isLogin(): boolean {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            return true;
        }

        return false;
    }

    checkAndUpdateToken = async (): Promise<boolean | null> => {
        if (this._needRefreshAccessToken()) {
            const token = await this._getNewAccessToken();

            console.log(token);
            if (token) {
                this.saveAccessToken(token ?? "");
            }
        }

        return !this._needRefreshRefreshToken();
    };

    generateNewTokens = async (id: string): Promise<void> => {
        const responce = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/generate-token`,
            { id: id }
        );

        if (!responce.data.success) {
            console.log("!success");

            return;
        }

        const accessToken = responce.data.tokens.access;
        const refreshToken = responce.data.tokens.refresh;

        this.saveAccessToken(accessToken);
        this.saveRefreshToken(refreshToken);
    };

    removeTokens = () => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshTokenSetDate");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accessTokenSetDate");
    };

    // Core
    private _needRefreshAccessToken(): boolean | null {
        const leftToLive = this._secondsToUpdate("accessTokenSetDate");
        return leftToLive != null
            ? leftToLive >= this.accessTokenLifetime
            : null;
    }

    private _needRefreshRefreshToken(): boolean | null {
        const leftToLive = this._secondsToUpdate("refreshTokenSetDate");

        return leftToLive != null ? leftToLive <= 0 : null;
    }

    private _getAccessToken = (): string | null =>
        localStorage.getItem("accessToken");
    private _getRefreshToken = (): string | null =>
        localStorage.getItem("refreshToken");

    private _secondsToUpdate(tokenKey: string): number | null {
        const setDate = localStorage.getItem(tokenKey);

        if (!setDate) return null;

        const date = moment(setDate);
        const now = moment();
        const diff = moment.duration(now.diff(date));

        return diff.asSeconds();
    }

    private _getNewAccessToken = async (): Promise<any | null> => {
        if (this._needRefreshRefreshToken()) {
            return null;
        }

        const refreshToken = this._getRefreshToken();
        const accessToken = this._getAccessToken();
        const userId = localStorage.getItem("uid");

        if (!refreshToken || !accessToken || !userId) return null;

        const responce = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/token`, {
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

    getAndUpdateNewAccessToken = async (): Promise<void> => {
        const tokens = await this._getNewAccessToken();
        if (tokens) {
            this.saveAccessToken(tokens.access ?? "");
            this.saveRefreshToken(tokens.refresh ?? "");
        }
    };
}

export default new TokenServices();
