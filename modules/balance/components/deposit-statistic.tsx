import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateText = styled.span`
  color: #565656;
  font-size: 14px;
`;

const MoneyAmountText = styled.h5`
  color: #30b9d6;
  font-size: 32px;
  font-weight: 500;
  margin-top: 3px;
  
  &:after {
    content: "₽";
    vertical-align: super;
    font-size: 16px;
    font-weight: 400;
  }
`;

export type Props = {
    date: string;
    amount: number;
}

const DepositStatistic: React.FC<Props> = ({ date, amount }) => {
    return <Container>
        <DateText>{ date }</DateText>
        <MoneyAmountText>{ amount.toLocaleString() }</MoneyAmountText>
    </Container>
}

export default DepositStatistic;