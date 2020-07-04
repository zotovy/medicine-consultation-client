import React from "react";
import { Link as Linker } from "react-router-dom";
import { observer } from "mobx-react";
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

// Components
import Title from "../components/title";
import SubTitle from "../components/subtitle";
import Link from "../components/link";
import SizedBox from "../../../components/sized-box";
import ConfirmButton from "../../../components/confirm-button";
import SignUpForm from "../components/signup-form";
import SignupLink from "../components/signup-link";
import Container from "../components/container";
import SexCheckbox from "../components/sex-checkbox";
import Image from "../components/image";

// Store
import signupUIStore from "../stores/signupUI";

// Static
import "../../../static/index.css";


const Wrapper = styled.div`
    display: flex;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 426px) {
        flex-direction: column;
    }
`

const HalfOfWidth = styled.div`
    width: 50%;
`;


const DoctorSignUp: React.FC = () => {
    return <Wrapper>
        <MediaQuery minDeviceWidth="1025px"><Image /></MediaQuery>

        <Container>
            <Title text="Стать врачём" />
            <SizedBox height="10px" />
            <SubTitle>Зарегистрируйтесь как врач для того, чтобы иметь возможность предоставлять свои медицинские услуги</SubTitle>
            <SizedBox height="10px" />
            <Link>Уже есть аккаунт? <span className="link">Войти!</span></Link>
            <SizedBox height="10px" />
            <SignUpForm />
            <SexCheckbox isMale={signupUIStore.isMale} onChange={signupUIStore.toggleIsMale} />
            <SizedBox height="15px" />

            <MediaQuery maxDeviceWidth="435px">
                <ConfirmButton content="Продолжить" onConfirm={() => { }} />
                <SizedBox height="10px" />
                <Linker to="/signup">
                    <SignupLink><a href="#">Регистрация для пользователей</a></SignupLink>
                </Linker>
            </MediaQuery>
            <MediaQuery minDeviceWidth="436px">
                <Row>
                    <HalfOfWidth>
                        <ConfirmButton content="Продолжить" onConfirm={() => { }} />
                    </HalfOfWidth>
                    <Linker to="/signup">
                        <SignupLink><a href="#">Регистрация для пользователей</a></SignupLink>
                    </Linker>
                </Row>
            </MediaQuery>
        </Container>



    </Wrapper>
}

export default observer(DoctorSignUp);