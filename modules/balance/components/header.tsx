import React from "react";
import styled from "styled-components";
import BalanceCard from "@/modules/balance/components/balance-card";
import DepositStatistic from "@/modules/balance/components/deposit-statistic";
import TranslateServices from "@/services/translate_services";

const Header = styled.header`
  display: flex;
  justify-content: start;
  
  @media screen and (max-width: 768px) {
    width: 100%;
  }
   
  .balance-card__component {
     margin-right: 45px;
  }
`;

const DepositStatisticContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media screen and (max-width: 768px) {
      display: none;
  }
  
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

export type Props = {
    balance: number;
    thisMonthAmount: number;
    thisYearAmount: number;
}

const HeaderComponent: React.FC<Props> = (props) => {
    const currentMonth = `В ${TranslateServices.monthsPP[new Date().getMonth()]}`;
    const currentYear = `В ${new Date().getFullYear()} г.`;

    return <Header>
        <BalanceCard balance={props.balance}/>
        <DepositStatisticContainer>
            <span className="put-on-money_text">Пополнение баланса</span>
            <div className="deposit-row">
                <DepositStatistic date={currentMonth} amount={props.thisMonthAmount}/>
                <DepositStatistic date={currentYear} amount={props.thisYearAmount}/>
            </div>
        </DepositStatisticContainer>
    </Header>
}

export default HeaderComponent;
