import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
    width: 100%;
    height: 50px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 5px 20px 0 #0000000d;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    cursor: pointer;
    
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        height: auto;
    }
`;

const AmountText = styled.div`
    width: 30px;
    height: 30px;
    margin: 0 12px 0 0;
    padding: 5px 10px 4px 11px;
    box-shadow: 0 3px 6px 0 #30b9d626;
    background-color: #30b9d6;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 25px;
        height: 25px;
        font-size: 15px;
    }
`;

const NewRequestText = styled.span`
    width: 119px;
    height: 21px;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: #282828;
    
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: 16px;
        line-height: 1.25;
    }
`;

export type Props = {
    amount: number;
}

const RequestComponent: React.FC<Props> = ({ amount }) => {
    if (amount === 0) return <React.Fragment/>;

    return <Link href="/hub/doctor/requests">
        <a>
            <Container className="requests_component">
                <AmountText>{ amount }</AmountText>
                <NewRequestText>Новая заявка</NewRequestText>
            </Container>
        </a>
    </Link>
}

export default RequestComponent;
