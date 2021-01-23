class StorageServices {
    saveUser = (user: UserType): void => localStorage.setItem("user", JSON.stringify(user));

    getUser = (): UserType | null => {
        const raw = localStorage.getItem("user");
        if (!raw) return null;
        return JSON.parse(raw);
    }

    removeUser = (): void => localStorage.removeItem("user");

}




export default new StorageServices();