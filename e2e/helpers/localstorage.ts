import { ClientFunction } from "testcafe";

export const getLocalStorageItem = ClientFunction((prop) =>
    localStorage.getItem(prop)
);

export const clearLocalStorage = ClientFunction(() => localStorage.clear());
