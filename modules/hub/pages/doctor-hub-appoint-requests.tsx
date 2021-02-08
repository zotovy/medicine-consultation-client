import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Layout from "@/modules/hub/components/page-layout";
import Menu from "@/components/menu";
import HeaderComponent from "@/modules/hub/components/header";
import UserCard from "@/modules/hub/components/user-card";


const DoctorHubAppointRequestsPage: NextPage = () => {
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
                <UserCard
                    date={{ to: new Date(), from: new Date() }}
                    name={"Иван Иванов"}
                    onConnect={() => {}}
                    onReject={() => {}}
                    connectButtonText="Подтвердить"/>
            </div>
        </Layout>
    </React.Fragment>;
}

export default DoctorHubAppointRequestsPage;
