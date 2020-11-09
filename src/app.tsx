import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import "./static/index.css";
import Menu from "./modules/doctors/components/menu";
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
const SettingsAccountPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SettingsAccountPage })));
const SettingsConsultationPage = lazy(() => import("./modules/settings").then(module => ({ default: module.SettingsConsultationPage })));
const ErrorPage = lazy(() => import("./modules/other/pages/error"));

const Admin = lazy(() => import("./modules/admin"));
const AdminLogin = lazy(() => import("./modules/admin").then(module => ({ default: module.Login })));


const App = () => {
    return (
        <Switch>

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
            <Route path="/sympthoms" exact>
                <Menu/>
                <Suspense fallback={<React.Fragment/>}>
                    <SymptomsPage/>
                </Suspense>
            </Route>
            <Route path="/appoint" exact>
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
            <Route path="/settings">
                <Menu/>
                <Route path="/settings/account">
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsAccountPage/>
                    </Suspense>
                </Route><Route path="/settings/consultations" >
                    <Suspense fallback={<React.Fragment/>}>
                        <SettingsConsultationPage/>
                    </Suspense>
                </Route>
            </Route>


            <Route path="/admin-login" exact>
                <Suspense fallback={<React.Fragment/>}>
                    <AdminLogin/>
                </Suspense>
            </Route>;

            <Route path="/error">
                <Suspense fallback={<React.Fragment/>}>
                    <ErrorPage/>
                </Suspense>
            </Route>

            <Suspense fallback={<React.Fragment/>}>
                <Admin/>
            </Suspense>


        </Switch>
    );
}

export default App;
