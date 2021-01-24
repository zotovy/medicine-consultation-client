import React from 'react';
import { NextPage } from "next"; 
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react';
import ResetPasswordFromEmailController from "../stores/reset-password";
import TextField from "../../../components/text-field";
import ConfirmButton from "../../../components/confirm-button";
import { LockIcon, DoneIcon } from '../icons';
import PasswordError from "../components/password-error";
import withController from "../../../utils/inject";

type Props = {
    resetPasswordFromEmailController: ResetPasswordFromEmailController;
}

const ResetPasswordFromEmailPage: NextPage<Props> = (props) => {
    const history = useHistory();
    const controller = props.resetPasswordFromEmailController;

    const goHome = () => {
        history.push("/");
        controller.successOperation = false;
    };

    return <section className="reset-password-module">
        <main>
            {
                !controller.successOperation
                    ? <div className="container">
                        <div className="illustration">
                            <LockIcon />
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

                        <PasswordError error={controller.emailError} />

                        <ConfirmButton
                            content="Подтвердить"
                            onConfirm={controller.sendResetPasswordEmail}
                            borderRadius="7px"
                        />
                    </div>
                    : <div className="container">
                        <div className="illustration">
                            <DoneIcon />
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
}

export default withController(observer(ResetPasswordFromEmailPage), "resetPasswordFromEmailController");