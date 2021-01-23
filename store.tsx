import React from "react";
import { enableStaticRendering } from "mobx-react";


// Controllers
import AnimController from "./modules/main/controller";
import SignupUIStore from "./modules/auth/stores/signupUI"; 
import LoginUIStore from "./modules/auth/stores/loginUI";
import ResetPasswordFromEmailController from "./modules/auth/stores/reset-password";

enableStaticRendering(typeof window === "undefined");

let clientSideStores: Controllers | null;

export type Controllers = {
    animController: AnimController
    signupUiStore: SignupUIStore,
    loginUIStore: LoginUIStore
    resetPasswordFromEmailController: ResetPasswordFromEmailController,
}

const createController = (): Controllers => ({
    animController: new AnimController(),
    signupUiStore: new SignupUIStore(),
    loginUIStore: new LoginUIStore(),
    resetPasswordFromEmailController: new ResetPasswordFromEmailController(),
})

export const getControllers = (): Controllers => {
    if (typeof window === "undefined") {
        return createController();
    }

    if (!clientSideStores) {
        clientSideStores = createController();
    }

    return clientSideStores;
}

const ControllerContext = React.createContext(null);

export const StoreProvider = (props: any) =>  {
    return <ControllerContext.Provider value={props.value}>{props.children}</ControllerContext.Provider>;
}

export function useControllers() {
    return React.useContext(ControllerContext);
}