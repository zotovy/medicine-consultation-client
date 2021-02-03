import React from "react";
import BalanceCard from "@/modules/balance/components/balance-card";
import styled from "styled-components";

/**
 * This page is injectable. Do not use it without any wrapper
 */

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserBalancePage: React.FC = () => {
    return <Page>
        <BalanceCard balance={123.1235}/>
    </Page>
}

export default UserBalancePage;