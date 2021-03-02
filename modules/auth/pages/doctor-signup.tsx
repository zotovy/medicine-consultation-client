import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import Badge from "../../../components/badge";
import SignupUIStore from "../stores/signupUI";
import ErrorBadge from "../../../components/error-badge";

// Component
import Image from "../components/image";

// Pages
import Page1 from "./doctor-signup/page-1";
import withController from "../../../utils/inject";
import { TYPES, useInjection } from "../../../container";

const Page2 = dynamic(() => import("./doctor-signup/page-2"));
const Page3 = dynamic(() => import("./doctor-signup/page-3"));


const Wrapper = styled.div`
    display: flex;
    background: white;
`;


const Swapper = styled.div`
    width: 55vw;
    height: 100%;
    overflow: hidden;

    @media screen and (max-width: 1024px) {
        width: 100vw;
    }
`;

const BadgeIcon: React.FC = () => {
    return <img src="../../../static/images/tick.png" alt="icon"/>
}

const DoctorSignUp: NextPage = () => {
    const router = useRouter();
    const signupUiStore = useInjection<SignupUIStore>(TYPES.signupUiStore);


    reaction(() => signupUiStore.redirectToHomeTrigger, () => {
        router.push("/");
    });

    return <div className="doctor-signup-module">
        <ErrorBadge message={signupUiStore.errorMessage ?? ""} isOpen={signupUiStore.showErrorMessage} />

        <Badge icon={BadgeIcon} title="Спасибо за регистрацию!" isOpen={signupUiStore.isBadgeOpen}>
            Ваши данные отправлены на проверку. Подробнее о том, как работает сервис вы можете почитать <a>здесь</a>.</Badge>
        <Wrapper>
            <Image className="signup-image" image="../../../static/images/signup-bg.png"/>
            <Swapper>
                <Page1/>
                <Page2/>
                <Page3/>
            </Swapper>
        </Wrapper>
    </div>
}

export default observer(DoctorSignUp);
