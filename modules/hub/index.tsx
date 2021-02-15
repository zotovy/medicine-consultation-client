import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import UserHub from "./pages/user-hub";
import DoctorHub from "./pages/doctor-hub";
import DoctorHubAppointRequestsPage from "./pages/doctor-hub-appoint-requests";

/**
 * NO SSR CONTEXT
 */

const Hub: NextPage = () => {
    const router = useRouter();

    const authorized = localStorage.getItem("uid");
    const isUser = localStorage.getItem("isUser") !== "false";

    if (!authorized) router.push("/login");
    else if (isUser) router.push("/hub/user");
    else router.push("/hub/doctor");

    return <React.Fragment/>;
}

export default Hub;

export {
    UserHub,
    DoctorHub,
    DoctorHubAppointRequestsPage,
}
