import React from "react";
import { NextPage } from "next";
import Linker from "next/link";
import styled from "styled-components";
import { reaction } from "mobx";
import { observer } from "mobx-react";

// Store
import LoginUIStore from "../stores/loginUI";
import { useRouter } from "next/router";

// Components
import TextField from "../../../components/text-field";
import SizedBox from "../../../components/sized-box";
import ConfirmButton from "../../../components/confirm-button";
import Title from "../components/title";
import SubTitle from "../components/subtitle";
import Link from "../components/link";
import withController from "../../../utils/inject";
import { TYPES, useInjection } from "../../../container";
import SignupUIStore from "@/modules/auth/stores/signupUI";
import Head from "next/head";

// Assets
// import bgImage from "../../../static/images/login-bg.png";

const Bg = styled.div`
 
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
        max-width: 50vw;
        border-radius: 20px;
        padding: 30px;

    }
`;

const ErrorMessage = styled.div`
    color: #FF3B30;
    text-align: center;
`;




const Login: NextPage = observer(() => {
    const router = useRouter();
    const loginUIStore = useInjection<LoginUIStore>(TYPES.loginUIStore);

    // Navigate to home page after login
    reaction(() => loginUIStore.goToHomeTrigger, () => router.push("/"));

    const Content = <Container>
        <Title text="Вход"/>
        <SizedBox height="10px"/>
        <SubTitle styles={{ textAlign: "center" }}>
            Войдите в свой аккаунт для получения качественных онлайн консультаций в любом формате.
        </SubTitle>
        <SizedBox height="10px"/>
        <Link>
            Нет аккаунта? &nbsp;
            <Linker href={"/signup"}><span className="signup-link">Зарегистрироваться!</span></Linker>
        </Link>
        <SizedBox height="10px"/>
        <TextField
            inputId="email"
            onChange={loginUIStore.setEmail}
            value={loginUIStore.email}
            validator={() => {
            }}
            field={"Email"}
            hint={"someemail@mail.com"}
            type={"email"}
        />
        <TextField
            inputId="password"
            onChange={loginUIStore.setPassword}
            onShowPasswordChanged={loginUIStore.toggleShowPassword}
            showPassword={loginUIStore.showPassword}
            value={loginUIStore.password}
            validator={() => {
            }}
            field={"Пароль"}
            hint={"••••••••••••"}
            type={"password"}
        />
        <SizedBox height="5px"/>
        <ConfirmButton content="Войти" onConfirm={loginUIStore.login}/>
        <SizedBox height="10px"/>
        <Row>
            {
                loginUIStore.error
                    ? <React.Fragment>
                        <ErrorMessage className="error-message">{loginUIStore.error}</ErrorMessage>
                        <SizedBox height="5px"/>
                    </React.Fragment>
                    : null
            }
            <Link>
                <Linker href="/reset-password-from-email">
                    <span className="forgot-password-link">Забыли пароль?</span>
                </Linker>
            </Link>

        </Row>
    </Container>



    return <React.Fragment>
        <Head>
            <title>Вход</title>
        </Head>

        <main className="login-module">
            <Bg className="login-bg">
                {Content}
            </Bg>
        </main>
    </React.Fragment>

});

export default Login;
// export default inject("loginUIStore")(Login);
