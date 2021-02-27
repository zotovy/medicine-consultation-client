import React from "react";
import Head from "next/head";
import styled from "styled-components";
import ConfirmButton from "@/components/confirm-button";

const Container = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    h1 {
        font-size: 36px;
        font-weight: 500;
        line-height: 1.22;
        text-align: center;
        margin-bottom: 30px;
        color: #282828;
    }
    
    p.subtitle {
        font-size: 22px;
        line-height: 1.41;
        text-align: center;
        color: #565656;
        margin-bottom: 30px;
        max-width: 500px;
        white-space: pre-line;
    }
    
    .confirm-button {
        width: 195px;
    }
`;


const LayoutNotStartedConsultation: React.FC<Props> = (props) => {
    return <Container>
        <Head>
            <title>Консультация</title>
        </Head>

        <h1>{ props.title }</h1>
        <p className="subtitle">{ props.subtitle }</p>
        <ConfirmButton
                type={props.button}
                onConfirm={props.onClick}
                content={props.buttonText}/>
    </Container>
}

export type Props = {
    title: string,
    subtitle: string,
    button: "primary" | "secondary",
    buttonText: string,
    onClick: () => any,
}
export default LayoutNotStartedConsultation;
