import { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";

import ConfirmButton from "@/components/confirm-button";
import { useRouter } from "next/router";

const Container = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        max-width: 547px !important;
        max-height: 90% !important;
        margin: 20px !important;
    }

    h3 {
        max-width: 547px;
        margin-top: 43px;
        text-align: center;
        color: #565656;
        font-weight: normal;
    }

    .confirm-button {
        max-width: 250px;
        margin-top: 30px;
    }
`;

const Hub404Page: NextPage = () => {
    const router = useRouter();

    return <Container>
        <img
                src="../../../static/images/hub-404-illustration.png"/>
        <h3>Мы не нашли ни одной консультации для вас.
            Но вы всегда можете на нее записаться!</h3>
        <ConfirmButton
                onConfirm={() => router.push("/find-doctor")}
                content="Найти врача"/>
    </Container>;
}

export default Hub404Page;
