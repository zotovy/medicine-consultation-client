import React from "react";
import styled from "styled-components";
import DepositStatistic from "@/modules/balance/components/deposit-statistic";
import BalanceCard from "@/modules/balance/components/balance-card";

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
        <BalanceCard balance={500} />
        <DepositStatistic date={"В Ноябре"} amount={50021312} />
    </Page>
}

export default UserBalancePage;