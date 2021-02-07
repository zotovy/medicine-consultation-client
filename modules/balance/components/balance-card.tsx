import React from "react";
import styled from "styled-components";
import { SendIcon } from "@/static/icons";

const Container = styled.div`
    border-radius: 20px;
    background: #30B9D6;
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    padding: 30px 125px 30px 30px;
    
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    
    &:after {
        content: "";
        border: 5px rgba(255, 255, 255, 0.15) solid;
        position: absolute;
        right: -15px;
        bottom: -15px;
        border-radius: 20px;
        width: 90px;
        height: 100px;
    }
`;

const MyBalanceText = styled.span`
  color: rgba(255, 255, 255, 0.75);
  font-size: 15px;
`;

const BalanceText = styled.h5`
  color: white;
  font-size: 36px;
  font-weight: 600;
  
  &:after {
    content: "₽";
    vertical-align: super;
    font-size: 16px;
    font-weight: 400;
  }
`;

const TransactionButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  border: none;
  cursor: pointer;
  position: absolute;
  right: 30px;
  margin-top: 16.5px;
  padding: 7.5px;
  z-index: 100;
  outline: none;
  transition: background 150ms;
  
  &:hover {
    background: rgba(255, 255, 255, 0.45);
  }
  
  svg {
    width: 15px;
    hright: 15px;
  }
`;

export type Props = {
    balance: number;
}

const BalanceCard: React.FC<Props> = ({ balance }) => {
    return <Container className="balance-card__component">
        <MyBalanceText>Мой баланс</MyBalanceText>
        <BalanceText>{ balance.toLocaleString() }</BalanceText>
        <TransactionButton><SendIcon/></TransactionButton>
    </Container>
}

export default BalanceCard;
