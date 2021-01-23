import React from "react";
import { NextPage } from "next";
import Linker from "next/link";
import styled from "styled-components";
// import MediaQuery from 'react-responsive';
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

// Assets
// import bgImage from "../../../static/images/login-bg.png";

const Bg = styled.div`
  background: url(../../../static/images/login-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
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


type Props = {
    loginUIStore: LoginUIStore;
}

const Login: NextPage<Props> = observer((props) => {
    let router = useRouter();

    const { loginUIStore } = props;

    // Navigate to home page after login
    reaction(() => loginUIStore.goToHomeTrigger, () => router.push("/"));

    const content = <Container>
        <Title text="Вход"/>
        <SizedBox height="10px"/>
        <SubTitle styles={{ textAlign: "center" }}>
            Войдите в свой аккаунт для получения качественных онлайн консультаций в любом формате.
        </SubTitle>
        <SizedBox height="10px"/>
        <Link>
            Нет аккаунта? &nbsp;
            <Linker href={"/signup"}><span>Зарегистрироваться!</span></Linker>
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
                        <ErrorMessage>{loginUIStore.error}</ErrorMessage>
                        <SizedBox height="5px"/>
                    </React.Fragment>
                    : null
            }
            <Linker href="/reset-password-from-email">
                <Link>
                    <span>Забыли пароль?</span>
                </Link>
            </Linker>

        </Row>
    </Container>

    return <main className="login-module">
            {/*<MediaQuery minWidth="768px">*/}
            <Bg className="login-bg">
                {content}
            </Bg>
            {/*</MediaQuery>*/}
            {/*<MediaQuery maxWidth="767px">*/}
            {/*    {content}*/}
            {/*</MediaQuery>*/}
    </main>

});

export default withController(Login, "loginUIStore") as NextPage;
// export default inject("loginUIStore")(Login);