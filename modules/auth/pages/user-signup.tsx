import React from "react";
import Linker from "next/link";
import Head from "next/head";
import MediaQuery from "react-responsive";
import styled from "styled-components";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { TYPES, useInjection } from "container";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Stores
import SignupUIStore from "../stores/signupUI";

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
import SexCheckbox from "../../../components/sex-checkbox";
import SignupLink from "../components/signup-link";


const Wrapper = styled.div`
    display: flex;
    background: white;
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

const UserSignUp: NextPage = observer(() => {
    const router = useRouter();
    const signupUiStore = useInjection<SignupUIStore>(TYPES.signupUiStore);

    // Navigate to home page after login
    reaction(() => signupUiStore.goToHomeTrigger, () => router.push("/"));

    return <React.Fragment>
        <Head>
            <title>Регистрация</title>
        </Head>

        <div className="signup-module">
            <ToastContainer />
            <Wrapper>

                {/*<ErrorBadge message={signupUiStore.errorMessage ?? ""} isOpen={signupUiStore.showErrorMessage} />*/}
                {/*<MediaQuery minDeviceWidth="1025px"><Image image="../../../static/images/signup-bg.png" /></MediaQuery>*/}
                <Image className="signup-image" image="../../../public/signup-bg.png"/>
                <Container>
                    <Title text="Регистрация"/>
                    <SizedBox height="10px"/>
                    <SubTitle>Зарегистрируйтесь для получения качественных онлайн консультаций в видео, аудио и текстовом
                        формате.</SubTitle>
                    <SizedBox height="10px"/>
                    <Link>Уже есть аккаунт? <Linker href="/login"><span className="link">Войти!</span></Linker></Link>
                    <SizedBox height="10px"/>
                    <SignUpForm/>
                    <SexCheckbox dataTest="male-checkbox" isMale={signupUiStore.isMale} onChange={signupUiStore.toggleIsMale}/>
                    <SizedBox height="15px"/>
                    <Checkbox
                              href={process.env.SERVER_URL + "/static/agreement.pdf"}
                              styles={{ container: { alignItems: "start" } }}
                              checked={signupUiStore.agreeWithTerms}
                              label="Я согласен(-а) с&nbsp;"
                              linkText="пользовательским соглашением"
                              dataTest="agree-terms-checkbox"
                              onChange={signupUiStore.toggleAgreeWT}/>
                    <SizedBox height="5px"/>
                    <Checkbox styles={{ container: { alignItems: "start" } }}
                              checked={signupUiStore.needMailing}
                              label="Я хочу получать уведомления на почту"
                              dataTest="mailing-checkbox"
                              onChange={signupUiStore.toggleNeedMailing}/>
                    <SizedBox height="15px"/>
                    <MediaQuery maxDeviceWidth="435px">
                        <ConfirmButton content="Зарегистрироваться" onConfirm={signupUiStore.signup}/>
                        <SizedBox height="10px"/>
                        <Linker href="/doctor-signup">
                            <SignupLink><span>Регистрация для врачей</span></SignupLink>
                        </Linker>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth="436px">
                        <Row>
                            <HalfOfWidth>
                                <ConfirmButton
                                        disabled={!signupUiStore.agreeWithTerms}
                                        dataTest="confirm"
                                        content="Зарегистрироваться"
                                        onConfirm={() => signupUiStore.agreeWithTerms ? signupUiStore.signup() : null}/>
                            </HalfOfWidth>

                            <SignupLink>
                                <Linker href="/doctor-signup">
                                    <span>Регистрация для врачей</span>
                                </Linker>
                            </SignupLink>
                        </Row>
                    </MediaQuery>
                </Container>
            </Wrapper>
        </div>
    </React.Fragment>
});

export default UserSignUp;
