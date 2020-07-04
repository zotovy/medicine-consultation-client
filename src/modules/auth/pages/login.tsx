import React from "react";
import styled from "styled-components";
import MediaQuery from 'react-responsive';
import { Link, useHistory } from "react-router-dom";
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
import LinkComponent from "../components/link";

// Assets
import bgImage from "../../../static/images/login-bg.png";




const Container = styled.div`
  width: 550px;
  background-color: white;
  border-radius: 1rem;
  padding: 40px;

  @media screen and (max-width: 768px) {
    height: calc(100vh - 72px); 
    width: calc(100% - 72px);
    padding: 36px;
    display: flex;
    overflow: scroll;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    width: 600px;
    padding: 36px;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

`;

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

const CheckboxContainer = styled.div`
      width: 100%;
      display: flex;
      justify-content: start;
    `;



const Login: React.FC = observer(() => {

    // ANCHOR: hooks
    let history = useHistory();

    // ANCHOR: Reactions
    // Navigate to home page after login
    reaction(() => authStore.goToHomeTrigger, () => history.push("/"));

    const mobileStyles = {
        subtitle: {
            fontSize: "18px",
            textAlign: "center",
        },
        textField: {
            field: {
                fontSize: "16px",
            },
            input: {
                fontSize: "16px",
            },
        },
        checkbox: {
            text: {
                fontSize: "14px",

            }
        },
        button: {
            text: {
                fontSize: "16px",
            },
            button: {
                width: "calc(100% - 20px)"
            }
        },
        link: {
            fontSize: "14px",
        }
    }

    const tabletStyles = {
        title: {
            fontSize: "64px",
        },
        subtitle: {
            fontSize: "20px",
            textAlign: "center",
        },
        textField: {
            field: {
                fontSize: "18px",
            },
            input: {
                fontSize: "18px",
            },
        },
        checkbox: {
            text: {
                fontSize: "16px",
            }
        },
        button: {
            text: {
                fontSize: "18px",
            },
            button: {
                width: "calc(100% - 28px)"
            }
        },
    }



    return (
        <div>
            <MediaQuery maxDeviceWidth={767}>
                <Container className={"container"}>
                    <Title text={"Вход"} />
                    <SubTitle styles={mobileStyles.subtitle}>
                        Войдите в аккаунт для получения качественных медицинских онлайн
                        консультаций.
                    </SubTitle>
                    <SizedBox height="32px" />
                    <TextField

                        onChange={(val: string) => loginUIStore.setEmail(val)}
                        value={loginUIStore.email}
                        styles={mobileStyles.textField}
                        validator={() => { }}
                        field={"Email"}
                        hint={"your.awesome.email@mail.ru"}
                        type={"email"}
                    />
                    <SizedBox height="15px" />
                    <TextField

                        onChange={(val: string) => loginUIStore.setPassword(val)}
                        value={loginUIStore.password}
                        styles={mobileStyles.textField}
                        validator={() => { }}
                        field={"Password"}
                        hint={"••••••••••••"}
                        type={"password"}
                    />
                    <SizedBox height="10px" />
                    <CheckboxContainer>
                        <Checkbox
                            styles={mobileStyles.checkbox}
                            checked={loginUIStore.rememberMe}
                            onChange={loginUIStore.toggleRememberMe}
                            label={"Запомнить меня"}
                        />
                    </CheckboxContainer>
                    <SizedBox height="20px" />
                    <ConfirmButton
                        styles={mobileStyles.button}
                        onConfirm={authStore.login}
                        content={"Подтвердить"}
                        borderRadius={"5px"}
                    />
                    <SizedBox height="20px" />
                    <LinkComponent styles={mobileStyles.link} centered={true}>
                        Нет аккаунта? &nbsp;
                        <a href="#">Зарегистрироваться!</a>
                    </LinkComponent>
                    {
                        loginUIStore.error ? <div>
                            <SizedBox height="15px" />
                            <div className="login_error_container">
                                <p className="login_error_text">
                                    {loginUIStore.error}
                                </p>
                            </div>
                        </div> : ""
                    }
                </Container>

            </MediaQuery>

            <MediaQuery minDeviceWidth={768} maxDeviceWidth={1223}>
                <Bg>

                    <Container>
                        <Title text={"Вход"} styles={tabletStyles.title} />
                        <SizedBox height={"15px"} />
                        <SubTitle styles={tabletStyles.subtitle}>
                            Войдите в свой аккаунт для получения качественных онлайн консультаций
                            в любом формате.
                        </SubTitle>
                        <SizedBox height={"20px"} />
                        <TextField
                            onChange={(val: string) => loginUIStore.setEmail(val)}
                            value={loginUIStore.email}
                            validator={() => { }}
                            field={"Email"}
                            hint={"your.awesome.email@mail.ru"}
                            type={"email"}
                            styles={tabletStyles.textField}
                        />
                        <SizedBox height={"15px"} />
                        <TextField
                            onChange={(val: string) => loginUIStore.setPassword(val)}
                            value={loginUIStore.password}
                            validator={() => { }}
                            field={"Password"}
                            hint={"••••••••••"}
                            type={"password"}
                            styles={tabletStyles.textField}
                        />
                        {/* <SizedBox height="10px" /> */}
                        <CheckboxContainer >
                            <Checkbox
                                styles={tabletStyles.checkbox}
                                checked={loginUIStore.rememberMe}
                                onChange={() => loginUIStore.toggleRememberMe()}
                                label={"Запомнить меня"}
                            />
                        </CheckboxContainer>
                        <SizedBox height="20px" />
                        <ConfirmButton
                            styles={tabletStyles.button}
                            onConfirm={authStore.login}
                            content={"Подтвердить"}
                            borderRadius={"5px"}
                        />
                        <SizedBox height="10px" />
                        <Link to="/signup">
                            <LinkComponent styles={mobileStyles.link} centered={true}>
                                Нет аккаунта? &nbsp;
                                <a>Зарегистрироваться!</a>
                            </LinkComponent>
                        </Link>
                        {
                            loginUIStore.error ? <div>
                                <SizedBox height="20px" />
                                <div className="login_error_container">
                                    <p className="login_error_text">
                                        {loginUIStore.error}
                                    </p>
                                </div>
                            </div> : ""
                        }
                    </Container>

                </Bg>
            </MediaQuery>

            <MediaQuery minDeviceWidth={1224}>
                <Bg>
                    <Container>
                        <Title text={"Вход"} />
                        <SizedBox height="5px" />
                        <SubTitle styles={{ textAlign: "center" }}>
                            Войдите в свой аккаунт для получения качественных онлайн консультаций
                            в любом формате.
                        </SubTitle>
                        <SizedBox height="20px" />
                        <Link to={"/signup"}>
                            <LinkComponent centered={true}>
                                Нет аккаунта? &nbsp;
                                <span className="link">Зарегистрироваться!</span>
                            </LinkComponent>
                        </Link>
                        <SizedBox height="15px" />
                        <TextField
                            onChange={(val: string) => loginUIStore.setEmail(val)}
                            value={loginUIStore.email}
                            validator={() => { }}
                            field={"Email"}
                            hint={"your.awesome.email@mail.ru"}
                            type={"email"}
                        />
                        <SizedBox height="10px" />
                        <TextField
                            onChange={(val: string) => loginUIStore.setPassword(val)}
                            value={loginUIStore.password}
                            validator={() => { }}
                            field={"Password"}
                            hint={"••••••••••"}
                            type={"password"}
                        />
                        <SizedBox height="10px" />
                        <CheckboxContainer>
                            <Checkbox
                                checked={loginUIStore.rememberMe}
                                onChange={() => loginUIStore.toggleRememberMe()}
                                label={"Запомнить меня"}
                            />
                        </CheckboxContainer>
                        <SizedBox height="20px" />
                        <ConfirmButton
                            onConfirm={authStore.login}
                            content={"Подтвердить"}
                            borderRadius={"5px"}
                        />
                        {
                            loginUIStore.error ? <div>
                                <SizedBox height="15px" />
                                <div className="login_error_container">
                                    <p className="login_error_text">
                                        {loginUIStore.error}
                                    </p>
                                </div>
                            </div> : ""
                        }
                    </Container>
                </Bg>
            </MediaQuery>
        </div>


    );
});

export default Login;
