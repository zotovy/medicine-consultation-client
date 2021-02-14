import React, { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import styled from "styled-components";
import DoctorHubController from "@/modules/hub/controllers/doctor-hub-controller";
import { useInjection, TYPES } from "container";

import Menu from "@/components/menu";
import AppointInformation from "@/modules/hub/containers/appoint-information";
import NavigationComponent from "@/modules/hub/containers/navigation";
import { centerPageContent } from "@/static/mixins";

const Layout = styled.main`
  overflow-x: hidden;
  display: flex;
  ${centerPageContent}
  
  .appoint-information {
    width: 100%;
  }
  
  .documents {
    margin-top: 10px;
  }
  
  @media screen and (max-width: 768px) {
    width: 100vw;
    flex-direction: row-reverse;  
  
    .appoint-information_container {
      transform: translateX(100vw);
      flex: 0 0 100vw;
      transition: transform 300ms ease-in-out;
    }
  
    .navigation_container {
      transform: translateX(100vw);
      width: calc(100% - 40px);
      flex: 0 0 auto;
      transition: transform 300ms ease-in-out;
      margin: 0 20px 20px;
    }
    
    &.appoint-selected {
      .appoint-information_container {
        transform: translateX(0vw);
      }
      
      .navigation_container {
        transform: translateX(0vw);
      }
    }
  }
`;

const DoctorHubPage: NextPage = () => {
    const controller = useInjection<DoctorHubController>(TYPES.doctorHubController);
    const router = useRouter();

    useEffect(() => {
        controller.load(router.query);
    }, []);

    return <React.Fragment>
        <Head>
            <title>Hub</title>
        </Head>
        <Menu/>

        <Layout className={`${controller.selectAnyAppoint ? "appoint-selected" : ""}`}>
            <AppointInformation
                    appointment={controller.selectedAppoint}
                    switchToNavigation={() => {
                        router.replace("/hub/doctor", undefined, { shallow: true });
                        controller.selectAnyAppoint = false;
                        setTimeout(() => controller.selectedAppoint = null, 300);
                    }}/>

            <NavigationComponent
                    requests={controller.appointsRequests}
                    appoints={controller.appoints}
                    dates={controller.appointsDates}
                    onSelectDate={controller.loadAppoints}
                    selectedAppointId={controller.selectedAppoint?._id ?? null}
                    selectAppoint={controller.selectAppoint}/>
        </Layout>
    </React.Fragment>;
}

export default observer(DoctorHubPage);
