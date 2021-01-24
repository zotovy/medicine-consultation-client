export default class StorageServices {
    static saveUser = (user: UserType): void => {
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(user));
        }
    };

    static getUser = (): UserType | null => {
        if (typeof window === "undefined") return null;
        const raw = localStorage.getItem("user");
        if (!raw) return null;
        return JSON.parse(raw);
    }

    static removeUser = (): void => localStorage.removeItem("user");
}
