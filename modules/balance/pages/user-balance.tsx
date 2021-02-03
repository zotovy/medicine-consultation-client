import React from "react";
import styled from "styled-components";

// Components
import Header from "../components/header";

/**
 * This page is injectable. Do not use it without any wrapper
 */

const Page = styled.div`
  display: flex;
  //flex-direction: column;
  align-items: flex-start;
`;

const UserBalancePage: React.FC = () => {
    return <Page>
        <Header/>
    </Page>
}

export default UserBalancePage;