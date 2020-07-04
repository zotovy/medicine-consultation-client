import React from "react";
import styled from "styled-components";
import MediaQuery from 'react-responsive';
import { Link as Linker, useHistory } from "react-router-dom";
import { reaction } from "mobx";
import { observer } from "mobx-react";

// Store
import loginUIStore from "../stores/loginUI";
import authStore from "../store";

// Components
import TextField from "../../../components/text-field";
import SizedBox from "../../../components/sized-box";
import ConfirmButton from "../../../components/confirm-button";
import Checkbox from "../../../components/checkbox";
import Title from "../components/title";
import SubTitle from "../components/subtitle";
import Link from "../components/link";

// Assets
import bgImage from "../../../static/images/login-bg.png";
import loginUI from "../stores/loginUI";

const Bg = styled.div`
  background: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    
    /* Phone */
    @media screen and (max-width: 424px) {
        height: 100vh;
        padding: 3vh;
        justify-content: center;
    }

    /* Tablet */
    @media screen and (min-width: 424px) and (max-width: 1025px) {
        justify-content: center;
        border-radius: 20px;
        max-width: 65vw;
        padding: 30px;
    }

    /* Desktop */
    @media screen and (min-width: 1025px) {
        max-width: 45vw;
        border-radius: 20px;
        padding: 30px;

    }
`;

const ErrorMessage = styled.div`
    color: #FF3B30;
    text-align: center;
`;





const Login: React.FC = observer(() => {

    // ANCHOR: hooks
    let history = useHistory();

    // ANCHOR: Reactions
    // Navigate to home page after login
    reaction(() => authStore.goToHomeTrigger, () => history.push("/"));


    const content = <Container>
        <Title text="Вход" />
        <SizedBox height="10px" />
        <SubTitle styles={{ textAlign: "center" }}>
            Войдите в свой аккаунт для получения качественных онлайн консультаций в любом формате.
        </SubTitle>
        <SizedBox height="10px" />
        <Link>
            Нет аккаунта? &nbsp;
        <Linker to={"/signup"}><a>Зарегистрироваться!</a></Linker>
        </Link>
        <SizedBox height="10px" />
        <TextField
            onChange={(val: string) => loginUIStore.setEmail(val)}
            value={loginUIStore.email}
            validator={() => { }}
            field={"Email"}
            hint={"someemail@mail.com"}
            type={"text"}
        />
        <TextField
            onChange={(val: string) => loginUIStore.setPassword(val)}
            value={loginUIStore.password}
            validator={() => { }}
            field={"Пароль"}
            hint={"••••••••••••"}
            type={"password"}
        />
        <Checkbox checked={loginUIStore.rememberMe} label="Запомнить меня" onChange={loginUIStore.toggleRememberMe} />
        <SizedBox height="15px" />
        <ConfirmButton content="Войти" onConfirm={authStore.login} />
        {
            loginUIStore.error
                ? <React.Fragment>
                    <SizedBox height="10px" />
                    <ErrorMessage>{loginUIStore.error}</ErrorMessage>
                </React.Fragment>
                : ""
        }
    </Container>

    return <React.Fragment>
        <MediaQuery minWidth="768px">
            <Bg>
                {content}
            </Bg>
        </MediaQuery>
        <MediaQuery maxWidth="767px">
            {content}
        </MediaQuery>
    </React.Fragment>


});

export default Login;
