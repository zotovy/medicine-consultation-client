import React from 'react';
import { observer } from 'mobx-react';
import TextField from "../../../components/text-field";
import ConfirmButton from "../../../components/confirm-button";
import { LockIcon } from '../icons';

const ResetPasswordFromEmailPage: React.FC = () => {
    return <section className="reset-password-from-email-module">
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
                    onChange={() => { }}
                    hint="Введите ваш Email"
                    needErrorHandle={true}
                    value={"123"}
                />

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