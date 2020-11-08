import React, { Suspense, lazy } from "react";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import Badge from "../../../components/badge";
import signupUIStore from "../stores/signupUI";
import ErrorBadge from "../../../components/error-badge";

// Component
import Image from '../components/image';
import tick from "../../../static/images/tick.png";

// Static
import "../../../static/index.css";
import image from "../../../static/images/signup-bg.png"

// Pages
import Page1 from "./doctor-signup/page-1";
const Page2 = lazy(() => import("./doctor-signup/page-2"));
const Page3 = lazy(() => import("./doctor-signup/page-3"));


const Wrapper = styled.div`
    display: flex;
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
    return <img src={tick} alt="icon" />
}


const DoctorSignUp: React.FC = () => {

    const history = useHistory();

    reaction(() => signupUIStore.redirectToHomeTrigger, () => {
        history.push("/");
    });

    return <div className="doctor-signup-module">
        <ErrorBadge message={signupUIStore.errorMessage ?? ""} isOpen={signupUIStore.showErrorMessage} />

        <Badge icon={BadgeIcon} title="Спасибо за регистрацию!" isOpen={signupUIStore.isBadgeOpen}>
            Ваши данные отправлены на проверку. Подробнее о том, как работает сервис вы можете почитать <a>здесь</a>.</Badge>
        <Wrapper>
            <MediaQuery minDeviceWidth="1025px">
                <Image image={image} />
            </MediaQuery>
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

export default observer(DoctorSignUp);