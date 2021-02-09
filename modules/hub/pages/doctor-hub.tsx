import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

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
    return <React.Fragment>
        <Head>
            <title>Hub</title>
        </Head>
        <Menu/>

        <Layout>
            <AppointInformation />
            <NavigationComponent />
        </Layout>
    </React.Fragment>;
}

export default DoctorHubPage;
