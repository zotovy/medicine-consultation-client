import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

import Menu from "@/components/menu";
import AppointInformation from "@/modules/hub/components/appoint-information";
import { centerPageContent } from "@/static/mixins";

const Layout = styled.main`
  display: flex;
  ${centerPageContent}
  
  .appoint-information {
    width: 100%;
    
  }
  
  nav {
    margin-left: 80px;
    width: 390px;
  }
`;

const DoctorHubPage: NextPage = () => {
    return <React.Fragment>
        <Head>
            <title>Hub</title>
        </Head>
        <Menu/>

        <Layout>
            <AppointInformation/>
            <nav>
                123
            </nav>
        </Layout>
    </React.Fragment>;
}

export default DoctorHubPage;
