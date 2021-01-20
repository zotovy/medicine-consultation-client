import React, { Suspense, lazy, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./static/index.css";
import Menu from "./components/menu";
import ReactGA from "react-ga";
// import SandBox from "./sandbox";
require('dotenv').config()


const MainPage = lazy(() => import("./modules/main"));
const Signup = lazy(() => import("./modules/auth").then(module => ({ default: module.Signup })));
const Login = lazy(() => import("./modules/auth").then(module => ({ default: module.Login })));
const DoctorSignUp = lazy(() => import("./modules/auth").then(module => ({ default: module.DoctorSignUp })));
const ResetPasswordFromEmail = lazy(() => import("./modules/auth").then(module => ({ default: module.ResetPasswordFromEmail })));
const ResetPassword = lazy(() => import("./modules/auth").then(module => ({ default: module.ResetPassword })));
const FindDoctor = lazy(() => import("./modules/doctors").then(module => ({ default: module.ChooseDoctor })));
const FilterCityModal = lazy(() => import("./modules/doctors").then(module => ({ default: module.FilterCityModal })));
const DetailDoctorPage = lazy(() => import("./modules/doctors").then(module => ({ default: module.DetailDoctorPage })));
const SymptomsPage = lazy(() => import("./modules/doctors").then(module => ({ default: module.SymptomsPage })));
const AppointmentPage = lazy(() => import("./modules/consultations").then(module => ({ default: module.AppointmentPage })));
const ConsultationPage = lazy(() => import("./modules/consultations").then(module => ({ default: module.ConsultationPage })));
const SettingsPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SettingsPage })));
const SettingsAccountPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SettingsAccountPage })));
const SettingsConsultationPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SettingsConsultationPage })));
const SettingsReviewPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SettingsReviewPage })));
const SettingsNotificationPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SettingsNotificationPage })));
const SettingsPasswordPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SettingsPasswordPage })));
const SettingsLinksPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SettingsLinksPage })));
const SettingsDoctorPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SettingsDoctorPage })));
const SettingsSupportPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SupportPage })));
const ErrorPage = lazy(() => import("./modules/other/pages/error"));
const ErrorSympPage = lazy(() => import("./modules/doctors/components/symptoms/error-page"));
const HubConsultationPage = lazy(() => import("./modules/consultations").then(module => ({ default: module.HubConsultationPage })));

const App = () => {

    return (
        <Switch >

            {/* <Route path='/sandbox'><SandBox /></Route> */}

            <Route path="/login" exact>
                <Suspense fallback={<React.Fragment/>}>
                    <Login/>
                </Suspense>
            </Route>
            <Route path="/signup" exact>
                <Suspense fallback={<React.Fragment/>}>
                    <Signup/>
                </Suspense>
            </Route>
            <Route path="/doctor-signup" exact>
                <Suspense fallback={<React.Fragment/>}>
                    <DoctorSignUp/>
                </Suspense>
            </Route>
            <Route path="/reset-password-from-email" exact>
                <Suspense fallback={<React.Fragment/>}>
                    <ResetPasswordFromEmail/>
                </Suspense>
            </Route>
            <Route path="/reset-password/:id" exact>
                <Suspense fallback={<React.Fragment/>}>
                    <ResetPassword/>
                </Suspense>
            </Route>
            <Route path="/find-doctor" exact>
                <Suspense fallback={<React.Fragment/>}>
                    <FilterCityModal/>
                </Suspense>
                <div className="doctor-module">
                    <Menu/>
                    <Suspense fallback={<React.Fragment/>}>
                        <FindDoctor/>
                    </Suspense>
                </div>
            </Route>
            <Route path="/doctor/:id" exact>
                <Menu/>
                <Suspense fallback={<React.Fragment/>}>
                    <DetailDoctorPage/>
                </Suspense>
            </Route>
            <Route path="/hub" exact>
                <Menu/>
                <Suspense fallback={<React.Fragment/>}>
                    <HubConsultationPage/>
                </Suspense>
            </Route>
            <Route path="/symptoms" exact>
                <Menu/>
                <Suspense fallback={<React.Fragment/>}>
                    <SymptomsPage/>
                </Suspense>
            </Route>
            <Route path="/appoint/:id" exact>
                <Suspense fallback={<React.Fragment/>}>
                    <AppointmentPage/>
                </Suspense>
            </Route>
            <Route path="/consultation/:id" exact>
                <Suspense fallback={<React.Fragment/>}>
                    <ConsultationPage/>
                </Suspense>
            </Route>
            <Route path="/" exact>
                <Menu/>
                <Suspense fallback={<React.Fragment/>}>
                    <MainPage/>
                </Suspense>
            </Route>
            <Route path="/symp-error">
                <Suspense fallback={<React.Fragment/>}>
                    <ErrorSympPage/>
                </Suspense>
            </Route>

            <Route path="/settings">
                <Menu/>
                <Route path="/settings" exact>
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsPage/>
                    </Suspense>
                </Route>
                <Route path="/settings/account">
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsAccountPage/>
                    </Suspense>
                </Route>
                <Route path="/settings/consultations">
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsConsultationPage/>
                    </Suspense>
                </Route>
                <Route path="/settings/reviews">
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsReviewPage/>
                    </Suspense>
                </Route>
                <Route path="/settings/notifications">
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsNotificationPage/>
                    </Suspense>
                </Route>
                <Route path="/settings/password">
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsPasswordPage/>
                    </Suspense>
                </Route>
                <Route path="/settings/links">
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsLinksPage/>
                    </Suspense>
                </Route>
                <Route path="/settings/doctor">
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsDoctorPage/>
                    </Suspense>
                </Route>
                <Route path="/settings/support">
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsSupportPage/>
                    </Suspense>
                </Route>
            </Route>

            <Route path="/error">
                <Suspense fallback={<React.Fragment/>}>
                    <ErrorPage/>
                </Suspense>
            </Route>

        </Switch>
    );
}

export default App;
