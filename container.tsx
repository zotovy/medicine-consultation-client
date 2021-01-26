import React, { useContext } from "react";
import { enableStaticRendering } from "mobx-react";
import { Container, interfaces } from "inversify";
import "reflect-metadata";

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
import SupportController from "@/modules/support/controllers/support-controller";
import DetailDoctorController from "@/modules/doctors/controllers/detail-controller";
import FindDoctorController from "@/modules/doctors/controllers/find-doctor-controller";
import SymptomsController from "@/modules/doctors/controllers/symptoms-controller";
import SymptomsSliderController from "@/modules/doctors/controllers/symptoms-slider-controller";

enableStaticRendering(typeof window === "undefined");

let container: Container | null;

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
    supportController: SupportController,
}

export const TYPES = {
    controller: Symbol("controller"),
    animController: Symbol("animController"),
    signupUiStore: Symbol("signupUiStore"),
    loginUIStore: Symbol("loginUIStore"),
    resetPasswordFromEmailController: Symbol("resetPasswordFromEmailController"),
    consultationController: Symbol("consultationController"),
    accountController: Symbol("accountController"),
    reviewsController: Symbol("reviewsController"),
    doctorSettingsController: Symbol("doctorSettingsController"),
    notificationsController: Symbol("notificationsController"),
    linkController: Symbol("linkController"),
    passwordController: Symbol("passwordController"),
    supportController: Symbol("supportController"),
    detailDoctorController: Symbol("detailDoctorController"),
    findDoctorController: Symbol("findDoctorController"),
    symptomsController: Symbol("symptomsController"),
    symptomsSliderController: Symbol("symptomsSliderController"),
}

const createController = (): Container => {
    const container = new Container();
    container.bind<AnimController>(TYPES.animController).to(AnimController).inSingletonScope();
    container.bind<SignupUIStore>(TYPES.signupUiStore).to(SignupUIStore).inSingletonScope();
    container.bind<LoginUIStore>(TYPES.loginUIStore).to(LoginUIStore).inSingletonScope();
    container.bind<ResetPasswordFromEmailController>(TYPES.resetPasswordFromEmailController).to(ResetPasswordFromEmailController).inSingletonScope();
    container.bind<ConsultationController>(TYPES.consultationController).to(ConsultationController).inSingletonScope();
    container.bind<AccountController>(TYPES.accountController).to(AccountController).inSingletonScope();
    container.bind<ReviewsController>(TYPES.reviewsController).to(ReviewsController).inSingletonScope();
    container.bind<DoctorSettingsController>(TYPES.doctorSettingsController).to(DoctorSettingsController).inSingletonScope()
    container.bind<NotificationsController>(TYPES.notificationsController).to(NotificationsController).inSingletonScope();
    container.bind<LinkController>(TYPES.linkController).to(LinkController).inSingletonScope();
    container.bind<PasswordController>(TYPES.passwordController).to(PasswordController).inSingletonScope();
    container.bind<SupportController>(TYPES.supportController).to(SupportController).inSingletonScope();
    container.bind<DetailDoctorController>(TYPES.detailDoctorController).to(DetailDoctorController).inSingletonScope();
    container.bind<FindDoctorController>(TYPES.findDoctorController).to(FindDoctorController).inSingletonScope();
    container.bind<SymptomsController>(TYPES.symptomsController).to(SymptomsController).inSingletonScope();
    container.bind<SymptomsSliderController>(TYPES.symptomsSliderController).to(SymptomsSliderController).inSingletonScope();

    container.bind<IController>(TYPES.controller).to(AnimController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(SignupUIStore).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(LoginUIStore).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(ResetPasswordFromEmailController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(ConsultationController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(AccountController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(ReviewsController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(NotificationsController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(LinkController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(PasswordController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(SupportController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(DetailDoctorController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(FindDoctorController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(SymptomsController).inSingletonScope()
    container.bind<IController>(TYPES.controller).to(SymptomsSliderController).inSingletonScope()

    return container;
    // return {
    //     animController: new AnimController(),
    //     signupUiStore: new SignupUIStore(),
    //     loginUIStore: new LoginUIStore(),
    //     resetPasswordFromEmailController: new ResetPasswordFromEmailController(),
    //     consultationController: new ConsultationController(),
    //     accountController: new AccountController(),
    //     reviewsController: new ReviewsController(),
    //     doctorSettingsController: new DoctorSettingsController(),
    //     notificationsController: new NotificationsController(),
    //     linkController: new LinkController(),
    //     passwordController: new PasswordController(),
    //     supportController: new SupportController(),
    // };
}

export const getContainer = (): Container => {
    if (typeof window === "undefined") {
        return createController();
    }

    if (!container) {
        container = createController();
    }

    return container;
}

const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });
export const InversifyProvider: React.FC<{ container: Container }> = (props) => {
    return <InversifyContext.Provider value={{ container: props.container }} >
        { props.children }
    </InversifyContext.Provider>
}

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>): T {
    const { container } = useContext(InversifyContext);
    if (!container) { throw new Error("No container found in provider") };
    return container.get<T>(identifier);
}

export interface IController {};