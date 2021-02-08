import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

import Menu from "@/components/menu";
import HeaderComponent from "@/modules/hub/components/header";
import UserCard from "@/modules/hub/components/user-card";

const Page = styled.main`
  width: 100%;
  margin: 34px auto;
  display: flex;
  flex-direction: column;
  
  .cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    column-gap: 80px;
    row-gap: 40px;
    margin-top: 15px;
  }
  
  @media screen and (min-width: 1440px) {
        width: 1420px;
  }
`;

const UserHub: NextPage = () => {
    return <React.Fragment>
        <Head>
            <title>Hub</title>
        </Head>
        <Menu/>

        <Page>
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
        </Page>
    </React.Fragment>;
}

export default UserHub;
