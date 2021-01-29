import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { observer } from "mobx-react";
import AppointmentController from "../controllers/appoint-controller";
import { TYPES, useInjection } from "container";

// Components
import Image from "@/modules/auth/components/image";

// Pages
import Page1 from "./appointment/page-1";
import Head from "next/head";
const Page2 = dynamic(() => import("./appointment/page-2"));

const AppointmentToConsultation: NextPage = () => {
    const controller = useInjection<AppointmentController>(TYPES.appointController);
    const translate = controller.pageIndex == 0 ? "" : "minus55";

    return <div className="appointment-module">
        <div className="wrapper">
            <Image image={"../../../static/images/signup-bg.png"} />
            <Head>
                <title>Запись на консультацию</title>
            </Head>

            <div className="swapper">
                <Page1 className={translate} />
                <Page2 className={translate} />
            </div>
        </div>
    </div>
}

export default observer(AppointmentToConsultation);