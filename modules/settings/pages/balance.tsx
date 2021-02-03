import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Menu from "@/components/menu";
import { UserBalancePage } from "@/modules/balance";
import NavigationComponent from "@/modules/settings/components/navigation";
import GoBackIcon from "@/modules/settings/components/go-back-icon";

const BalancePage: NextPage = () => {
    return <React.Fragment>
        <Head>
            <title>Настройки – Баланс</title>
        </Head>
        <Menu/>
        <main className="balance-page settings-page">
            <NavigationComponent active="/balance"/>
            <GoBackIcon/>
            <section className="content balance">
                <UserBalancePage/>
            </section>
        </main>
    </React.Fragment>
}

export default BalancePage;