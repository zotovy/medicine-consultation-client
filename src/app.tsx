import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import "./static/index.css";
// import { Signup, Login, DoctorSignUp } from "./modules/auth";
import { MainPage } from "./modules/main/index";
require('dotenv').config()

const Signup = lazy(() => import("./modules/auth").then(module => ({ default: module.Signup })));
const Login = lazy(() => import("./modules/auth").then(module => ({ default: module.Login })));
const DoctorSignUp = lazy(() => import("./modules/auth").then(module => ({ default: module.DoctorSignUp })));


const App = () => {


  return (
    <Switch>
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
      <Route path="/" exact>
        <Suspense fallback={<React.Fragment />}>
          <MainPage />
        </Suspense>
      </Route>

    </Switch >
  );
}

export default App;
