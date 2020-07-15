import React, { Suspense, lazy } from "react";
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

// Component
import Image from '../components/image';

// Static
import "../../../static/index.css";

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


const DoctorSignUp: React.FC = () => {
    return <Wrapper>
        <MediaQuery minDeviceWidth="1025px">
            <Image />
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
}

export default DoctorSignUp;