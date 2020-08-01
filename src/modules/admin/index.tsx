import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import ProtectedRoute from 'react-protected-route-component'
import App from "./App";
import Login from "./modules/Login/Login";
import store from "./store";

const Module: React.FC = () => {

    const [isLogin, setIsLogin] = useState();

    useEffect(() => {
        // @ts-ignore
        store.checkAdminId().then(data => { setIsLogin(data); console.log(isLogin); });
    }, []);



    return <Route path="/admin" >
        {
            isLogin === undefined ? <h1>Loading...</h1> : isLogin ? <App /> : <Redirect to="/admin-login" />
        }
    </Route>

    return <ProtectedRoute path="/admin" redirectRoute="/admin-login" guardFunction={store.checkAdminId} component={() => <App />} />
}

export default Module;

export { Login };
