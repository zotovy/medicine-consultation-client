import React, { Suspense, lazy } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import styled from 'styled-components';
import Badge from "../../../components/badge";
import SignupUIStore from "../stores/signupUI";
import ErrorBadge from "../../../components/error-badge";

// Component
import Image from '../components/image';

// Pages
import Page1 from "./doctor-signup/page-1";
import withController from "../../../utils/inject";
const Page2 = lazy(() => import("./doctor-signup/page-2"));
const Page3 = lazy(() => import("./doctor-signup/page-3"));


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
    return <img src="../../../static/images/tick.png" alt="icon" />
}

type Props = {
    signupUiStore: SignupUIStore
}


const DoctorSignUp: NextPage<Props> = (props) => {
    const router = useRouter();
    const { signupUiStore } = props;

    reaction(() => signupUiStore.redirectToHomeTrigger, () => {
        router.push("/");
    });

    return <div className="doctor-signup-module">
        {/*<ErrorBadge message={signupUiStore.errorMessage ?? ""} isOpen={signupUiStore.showErrorMessage} />*/}

        {/*<Badge icon={BadgeIcon} title="Спасибо за регистрацию!" isOpen={signupUiStore.isBadgeOpen}>*/}
        {/*    Ваши данные отправлены на проверку. Подробнее о том, как работает сервис вы можете почитать <a>здесь</a>.</Badge>*/}
        <Wrapper>
            <Image className="signup-image" image="../../../static/images/signup-bg.png" />
            <Swapper>
                <Page1 />
                <Suspense fallback={<React.Fragment />} >
                    <Page2 />
                </Suspense>
                <Suspense fallback={<React.Fragment />} >
                    <Page3 />
                </Suspense>
            </Swapper>
        </Wrapper >
    </div>
}

export default withController(observer(DoctorSignUp), "signupUiStore");
