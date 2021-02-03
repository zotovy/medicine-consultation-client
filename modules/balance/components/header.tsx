import React from "react";
import styled from "styled-components";
import BalanceCard from "@/modules/balance/components/balance-card";
import DepositStatistic from "@/modules/balance/components/deposit-statistic";

const Header = styled.header`
  display: flex;
  justify-content: start;
   
  .balance-card__component {
     margin-right: 45px;
  }
`;

const DepositStatisticContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  
  span.put-on-money_text {
    color: #282828;
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 10px;
  }
  
  .deposit-row {
    display: flex;
    
    .deposit-statistic__component {
      margin-right: 55px;
    }
  }
`;

export type Props = {}

const HeaderComponent: React.FC<Props> = ({}) => {
    return <Header>
        <BalanceCard balance={21123.312}/>
        <DepositStatisticContainer>
            <span className="put-on-money_text">Пополнение баланса</span>
            <div className="deposit-row">
                <DepositStatistic date="В Ноябре" amount={21411.0}/>
                <DepositStatistic date="В 2020г." amount={123112.12}/>
            </div>
        </DepositStatisticContainer>
    </Header>
}

export default HeaderComponent;