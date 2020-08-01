import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import MediaQuery from 'react-responsive';
import { Link as Linker } from "react-router-dom";

// Store
import signupUIStore from "../../stores/signupUI";

// Components
import Container from "../../components/container";
import Title from "../../components/title";
import SizedBox from "../../../../components/sized-box";
import SubTitle from "../../components/subtitle";
import Link from "../../components/link";
import SignUpForm from "../../components/signup-form";
import SexCheckbox from "../../components/sex-checkbox";
import ConfirmButton from "../../../../components/confirm-button";
import SignupLink from "../../components/signup-link";




const Page1 = styled.div`
    position:relative;
    left: 0px;
    transition: 1s;
`;

const HalfOfWidth = styled.div`
    width: 50%;

    /* Phone */
    @media screen and (max-width: 424px) {
        width: 100%;
        margin-bottom: 10px;
    } 
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    /** Phone */
    @media screen and (max-width: 426px) {
        flex-direction: column;
    }
`


const DSPage1: React.FC = () => {
    return <Page1 className={signupUIStore.pageIndex === 0 ? "" : signupUIStore.pageIndex === 1 ? "minus55" : "minus110"} >
        <Container>
            <Title text="Стать врачём" />
            <SizedBox height="10px" />
            <SubTitle>Зарегистрируйтесь как врач для того, чтобы иметь возможность предоставлять свои медицинские услуги</SubTitle>
            <SizedBox height="10px" />
            <Linker to="/login">
                <Link>Уже есть аккаунт? <span className="link">Войти!</span></Link>
            </Linker>
            <SizedBox height="10px" />
            <SignUpForm />
            <SexCheckbox isMale={signupUIStore.isMale} onChange={signupUIStore.toggleIsMale} />
            <SizedBox height="15px" />

            <Row>
                <ConfirmButton content="Продолжить" onConfirm={signupUIStore.goNextPage} />
                <MediaQuery maxDeviceWidth="435px"><SizedBox height="10px" /></MediaQuery>
                <Linker to="/signup">
                    <SignupLink><span>Регистрация для пользователей</span></SignupLink>
                </Linker>
            </Row>
            <SizedBox height="10px" />

        </Container>
    </Page1>
}

export default observer(DSPage1);
