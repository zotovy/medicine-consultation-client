import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import "./static/index.css";
import Menu from "./modules/doctors/components/menu";
// import SandBox from "./sandbox/sandbox";
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

const Admin = lazy(() => import("./modules/admin"));
const AdminLogin = lazy(() => import("./modules/admin").then(module => ({ default: module.Login })));


const App = () => {
  return (
    <Switch>

      {/* <Route path='/sandbox'><SandBox /></Route> */}
      <Route path="/symptoms" exact>
        <Menu />
        <Suspense fallback={<React.Fragment />}>
          <SymptomsPage />
        </Suspense>
      </Route>
      <Route path="/login" exact>
        <Suspense fallback={<React.Fragment />}>
          <Login />
        </Suspense>
      </Route>
      <Route path="/signup" exact>
        <Suspense fallback={<React.Fragment />}>
          <Signup />
        </Suspense>
      </Route>
      <Route path="/doctor-signup" exact>
        <Suspense fallback={<React.Fragment />}>
          <DoctorSignUp />
        </Suspense>
      </Route>
      <Route path="/reset-password-from-email" exact>
        <Suspense fallback={<React.Fragment />}>
          <ResetPasswordFromEmail />
        </Suspense>
      </Route>
      <Route path="/reset-password/:id" exact>
        <Suspense fallback={<React.Fragment />}>
          <ResetPassword />
        </Suspense>
      </Route>
      <Route path="/find-doctor">
        <Suspense fallback={<React.Fragment />}>
          <FilterCityModal />
        </Suspense>
        <div className="doctor-module">
          <Menu />
          <Suspense fallback={<React.Fragment />}>
            <FindDoctor />
          </Suspense>
        </div>
      </Route>
      <Route path="/doctor/:id" exact>
        <Menu />
        <Suspense fallback={<React.Fragment />}>
          <DetailDoctorPage />
        </Suspense>
      </Route>
      <Route path="/" exact>
        <Menu />
        <Suspense fallback={<React.Fragment />}>
          <MainPage />
        </Suspense>
      </Route>


      <Route path="/admin-login" exact>
        <Suspense fallback={<React.Fragment />}>
          <AdminLogin />
        </Suspense>
      </Route>;

      <Suspense fallback={<React.Fragment />}>
        <Admin />
      </Suspense>



    </Switch >
  );
}

export default App;
