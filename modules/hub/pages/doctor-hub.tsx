import React, { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { observer } from "mobx-react";
import styled from "styled-components";
import DoctorHubController from "@/modules/hub/controllers/doctor-hub-controller";
import { useInjection, TYPES } from "container";

import Menu from "@/components/menu";
import AppointInformation from "@/modules/hub/containers/appoint-information";
import NavigationComponent from "@/modules/hub/containers/navigation";
import { centerPageContent } from "@/static/mixins";

const Layout = styled.main`
  display: flex;
  ${centerPageContent}
  
  .appoint-information {
    width: 100%;
  }
`;

const DoctorHubPage: NextPage = () => {
    const controller = useInjection<DoctorHubController>(TYPES.doctorHubController);

    useEffect(() => {
        controller.load();
    }, []);

    return <React.Fragment>
        <Head>
            <title>Hub</title>
        </Head>
        <Menu/>

        <Layout>
            <AppointInformation />
            <NavigationComponent
                    requests={controller.appointsRequests}
                    appoints={controller.appoints}
                    dates={controller.appointsDates}
                    onSelectDate={controller.loadAppoints}
                    selectedAppointId={controller.selectedAppoint?._id ?? null}
                    selectAppoint={controller.selectAppoint} />
        </Layout>
    </React.Fragment>;
}

export default observer(DoctorHubPage);
