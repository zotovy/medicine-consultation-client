import React from "react";
import { enableStaticRendering } from "mobx-react";

// Controllers
import AnimController from "./modules/main/controller";
import SignupUIStore from "./modules/auth/stores/signupUI"; 
import LoginUIStore from "./modules/auth/stores/loginUI";
import ResetPasswordFromEmailController from "./modules/auth/stores/reset-password";
import ConsultationController from "./modules/settings/controllers/consultations_controller";
import AccountController from "@/modules/settings/controllers/account-controller";
import ReviewsController from "@/modules/settings/controllers/reviews-controller";
import DoctorSettingsController from "@/modules/settings/controllers/doctor-controller";
import NotificationsController from "@/modules/settings/controllers/notifications-controller";
import LinkController from "@/modules/settings/controllers/link-controller";
import PasswordController from "@/modules/settings/controllers/password-controller";

enableStaticRendering(typeof window === "undefined");

let clientSideStores: Controllers | null;

export type Controllers = {
    animController: AnimController
    signupUiStore: SignupUIStore,
    loginUIStore: LoginUIStore
    resetPasswordFromEmailController: ResetPasswordFromEmailController,
    consultationController: ConsultationController,
    accountController: AccountController,
    reviewsController: ReviewsController,
    doctorSettingsController: DoctorSettingsController,
    notificationsController: NotificationsController,
    linkController: LinkController,
    passwordController: PasswordController,
}

const createController = (): Controllers => ({
    animController: new AnimController(),
    signupUiStore: new SignupUIStore(),
    loginUIStore: new LoginUIStore(),
    resetPasswordFromEmailController: new ResetPasswordFromEmailController(),
    consultationController: new ConsultationController(),
    accountController: new AccountController(),
    reviewsController: new ReviewsController(),
    doctorSettingsController: new DoctorSettingsController(),
    notificationsController: new NotificationsController(),
    linkController: new LinkController(),
    passwordController: new PasswordController(),
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