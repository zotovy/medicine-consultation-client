import React from "react";
import { Link as Linker, useHistory } from "react-router-dom";
import MediaQuery from 'react-responsive';
import styled from "styled-components";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import classnames from "classnames";

// Stores
import signupUIStore from "../stores/signupUI";
import authStore from "../store";

// Components
import SizedBox from "../../../components/sized-box";
import Title from "../components/title";
import SubTitle from "../components/subtitle";
import Link from "../components/link";
import Checkbox from "../../../components/checkbox";
import ConfirmButton from "../../../components/confirm-button";
import SignUpForm from "../components/signup-form";
import Image from "../components/image";
import Container from "../components/container";
import SexCheckbox from "../components/sex-checkbox";
import SignupLink from "../components/signup-link";
import ErrorAlert from "../components/error-alert";


// Static
import "../styles.css";


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


const UserSignUp: React.FC = observer(() => {


  // ANCHOR: hooks
  let history = useHistory();

  // ANCHOR: Reactions
  // Navigate to home page after login
  reaction(() => authStore.goToHomeTrigger, () => history.push("/"));



  return <Wrapper>

    <ErrorAlert error={signupUIStore.errorMessage} showErrorMessage={signupUIStore.showErrorMessage} />
    <MediaQuery minDeviceWidth="1025px"><Image /></MediaQuery>

    <Container>
      <Title text="Регистрация" />
      <SizedBox height="10px" />
      <SubTitle>Зарегистрируйтесь для получения качественных онлайн консультаций в видео, аудио и текстовом формате.</SubTitle>
      <SizedBox height="10px" />
      <Link>Уже есть аккаунт? <Linker to="/login"><span className="link">Войти!</span></Linker></Link>
      <SizedBox height="10px" />
      <SignUpForm />
      <SexCheckbox isMale={signupUIStore.isMale} onChange={signupUIStore.toggleIsMale} />
      <SizedBox height="15px" />
      <Checkbox styles={{ container: { alignItems: "start" } }} checked={signupUIStore.agreeWithTerms} label="Я согласен(-а) с&nbsp;" linkText="пользовательским соглашением" onChange={signupUIStore.toggleAgreeWT} />
      <SizedBox height="5px" />
      <Checkbox styles={{ container: { alignItems: "start" } }} checked={signupUIStore.needMailing} label="Я хочу получать уведомления на почту" onChange={signupUIStore.toggleNeedMailing} />
      <SizedBox height="15px" />
      <MediaQuery maxDeviceWidth="435px">
        <ConfirmButton content="Зарегистрироваться" onConfirm={authStore.signup} />
        <SizedBox height="10px" />
        <Linker to="/doctor-signup">
          <SignupLink><a href="#">Регистрация для врачей</a></SignupLink>
        </Linker>
      </MediaQuery>
      <MediaQuery minDeviceWidth="436px">
        <Row>
          <HalfOfWidth>
            <ConfirmButton content="Зарегистрироваться" onConfirm={authStore.signup} />
          </HalfOfWidth>
          <Linker to="/doctor-signup">
            <SignupLink><a href="#">Регистрация для врачей</a></SignupLink>
          </Linker>
        </Row>
      </MediaQuery>
    </Container>
  </Wrapper>

});

export default UserSignUp;
