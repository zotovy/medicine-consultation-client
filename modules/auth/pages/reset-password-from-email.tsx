import React from 'react';
import { NextPage } from "next";
import { useHistory } from "react-router-dom";
import { observer } from 'mobx-react';
import ResetPasswordFromEmailController from "../stores/reset-password";
import TextField from "../../../components/text-field";
import ConfirmButton from "../../../components/confirm-button";
import { LockIcon, DoneIcon } from '../icons';
import PasswordError from "../components/password-error";
import { TYPES, useInjection } from "../../../container";
import Head from "next/head";

const ResetPasswordFromEmailPage: NextPage = () => {
    const history = useHistory();
    const controller = useInjection<ResetPasswordFromEmailController>(TYPES.resetPasswordFromEmailController);

    const goHome = () => {
        history.push("/");
        controller.successOperation = false;
    };

    return <React.Fragment>
        <Head>
            <title>Востановление пароля</title>
        </Head>

        <section className="reset-password-module">
            <main>
                {
                    !controller.successOperation
                            ? <div className="container">
                                <div className="illustration">
                                    <LockIcon/>
                                </div>
                                <h1>Забыли пароль?</h1>
                                <p className="subtitle">
                                    Введите ваш Email в форму ниже. Мы вышлем Вам на него
                                    письмо с инструкцией по восстановлению пароля.
                                </p>
                                <TextField
                                        onChange={(value) => controller.email = value}
                                        hint="Введите ваш Email"
                                        value={controller.email}
                                        needErrorHandle={true}
                                />

                                <PasswordError error={controller.emailError}/>

                                <ConfirmButton
                                        content="Подтвердить"
                                        onConfirm={controller.sendResetPasswordEmail}
                                        borderRadius="7px"
                                />
                            </div>
                            : <div className="container">
                                <div className="illustration">
                                    <DoneIcon/>
                                </div>
                                <h1>Проверьте свою почту!</h1>
                                <p className="subtitle">
                                    Мы отправили вас письмо с дальнейшей инструкцией!
                                </p>
                                <ConfirmButton
                                        content="На Главную"
                                        onConfirm={goHome}
                                        borderRadius="7px"
                                />
                            </div>
                }
            </main>
        </section>
    </React.Fragment>
}

export default observer(ResetPasswordFromEmailPage)
