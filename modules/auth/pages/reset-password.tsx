import React from "react";
import { NextPage } from "next";
import { useRouter } from 'next/router'
import { reaction } from 'mobx';
import { observer } from "mobx-react";
import TextField from "../../../components/text-field";
import { LockIcon, DoneIcon } from "../icons";
import ConfirmButton from "../../../components/confirm-button";
import PasswordError from "../components/password-error";
import ResetPasswordFromEmailController from "../stores/reset-password";
import Badge from "../../../components/badge";
import withController from "../../../utils/inject";
import { TYPES, useInjection } from "../../../container";
import Head from "next/head";



const ResetPasswordPage: NextPage = () => {
    const router = useRouter();
    const controller = useInjection<ResetPasswordFromEmailController>(TYPES.resetPasswordFromEmailController);
    const { id } = router.query;

    const goHome = () =>
        setTimeout(() => router.push("/login"), 5500);

    reaction(() => controller.successOperation, (arg) => {
        if (arg) {
            goHome();
        }
    });


    return <React.Fragment>
        <Head>
            <title>Востановление пароля</title>
        </Head>

        <Badge icon={DoneIcon} title="Спасибо за регистрацию!" isOpen={controller.successOperation}>
            Ваши данные отправлены на проверку. Подробнее о том, как работает сервис вы можете почитать <a>здесь</a>.</Badge>
        <section className="reset-password-module">
            <main>

                <div className="container">
                    <div className="illustration">
                        <LockIcon />
                    </div>
                    <h1 id="password">Восстановление пароля</h1>
                    <p className="subtitle" id="password">
                        Введите Ваш новый пароль
                        </p>
                    <TextField
                        onChange={(value) => controller.password1 = value}
                        hint="Введите ваш пароль"
                        value={controller.password1}
                        needErrorHandle={true}
                        type="password"
                        useTextHint={true}
                        removePassswordIcon={true}
                    />
                    <TextField
                        onChange={(value) => controller.password2 = value}
                        hint="Подтвердите ваш пароль"
                        value={controller.password2}
                        needErrorHandle={true}
                        type="password"
                        useTextHint={true}
                        removePassswordIcon={true}
                    />

                    <PasswordError error={controller.passwordError} />

                    <ConfirmButton
                        content="Сменить пароль"
                        onConfirm={() => {
                            controller.sendResetPasswordRequest(id as string);
                        }}
                        borderRadius="7px"
                    />
                </div>
            </main>
        </section>
    </React.Fragment>


}

export default withController(observer(ResetPasswordPage), "resetPasswordFromEmailController");
