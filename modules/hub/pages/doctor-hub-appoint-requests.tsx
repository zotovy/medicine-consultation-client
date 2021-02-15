import React, { useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { observer } from "mobx-react";
import { useInjection, TYPES } from "container";

import Layout from "@/modules/hub/components/page-layout";
import Menu from "@/components/menu";
import HeaderComponent from "@/modules/hub/components/header";
import UserCard from "@/modules/hub/components/user-card";
import DoctorRequestHubController from "@/modules/hub/controllers/doctor-request-hub-controller";
import { useRouter } from "next/router";
import LoadingContainer from "@/modules/hub/containers/loading";


const DoctorHubAppointRequestsPage: NextPage = () => {
    const controller = useInjection<DoctorRequestHubController>(TYPES.doctorRequestsController);
    const router = useRouter();
    const isUser = localStorage.getItem("isUser") === "true";

    useEffect(() => {
        // redirect to correct hub based on isUser
        if (!localStorage.getItem("isUser")) router.push("/login");
        if (isUser) router.push("/hub/user");

        controller.load();
    }, []);

    // return empty page while redirecting to correct hub page
    if (isUser) return <React.Fragment/>

    // show spinner if loading some data
    if (controller.isLoading) {
        return <LoadingContainer title="Запросы на консультацию" />
    }

    return <React.Fragment>
        <Head>
            <title>Запросы на консультацию</title>
        </Head>
        <Menu/>

        <Layout>
            <HeaderComponent
                title="Заявки на консультацию"
                back={true}
                subtitle="Пациенты оставили заявки на ваши консультации. Вы
                можете подтвердить их в течение 24 часов или сразу отказаться." />

            <div className="cards">
                {
                 controller.requests.map(req => {
                     const appoint = req.appointment as IAppointment;
                     const patient = req.patient as UserType;

                     return <UserCard
                             key={req._id}
                             date={{ to: appoint.to, from: appoint.from }}
                             name={ patient.fullName }
                             onConnect={() => controller.confirmAppoint(req._id)}
                             onReject={() => controller.rejectAppoint(req._id)}
                             connectButtonText="Подтвердить"/>
                 })
                }
            </div>
        </Layout>
    </React.Fragment>;
}

export default observer(DoctorHubAppointRequestsPage);
