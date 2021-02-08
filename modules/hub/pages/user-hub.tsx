import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import Layout from "@/modules/hub/components/page-layout";
import Menu from "@/components/menu";
import HeaderComponent from "@/modules/hub/components/header";
import UserCard from "@/modules/hub/components/user-card";


const UserHub: NextPage = () => {
    return <React.Fragment>
        <Head>
            <title>Hub</title>
        </Head>
        <Menu/>

        <Layout>
            <HeaderComponent title="Консультации" />
            <div className="cards">
                <UserCard
                    date={{ to: new Date(), from: new Date() }}
                    name={"Иван Иванов"}
                    onConnect={() => {}}
                    onReject={() => {}} />
            </div>
            <div className="space" style={{ marginTop: "40px" }} />

            <HeaderComponent
                title="Неподтвержденные консультации"
                subtitle="Эти консультации еще не подтвердил доктор. Мы уведомим вас если доктор откажется от нее"/>
            <div className="cards">
                <UserCard
                    date={{ to: new Date(), from: new Date() }}
                    name={"Иван Иванов"} />
            </div>
        </Layout>
    </React.Fragment>;
}

export default UserHub;
