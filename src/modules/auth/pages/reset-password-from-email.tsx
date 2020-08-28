import React from 'react';
import { observer } from 'mobx-react';
import controller from "../stores/reset-password";
import TextField from "../../../components/text-field";
import ConfirmButton from "../../../components/confirm-button";
import { LockIcon } from '../icons';
import PasswordError from "../components/password-error";


const ResetPasswordFromEmailPage: React.FC = () => {
    return <section className="reset-password-module">
        <main>
            <div className="container">
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
                    onConfirm={() => { }}
                    borderRadius="7px"
                />
            </div>
        </main>
    </section>
}

export default observer(ResetPasswordFromEmailPage);