import React from "react";
import { observer } from "mobx-react";
import TextField from "../../../components/text-field";
import { LockIcon } from "../icons";
import ConfirmButton from "../../../components/confirm-button";
import controller from "../stores/reset-password";


const ResetPasswordPage: React.FC = () => {
    return <section className="reset-password-module">
        <main>
            <div className="container">
                <div className="illustration">
                    <LockIcon />
                </div>
                <h1 id="password">Восстановление пароля</h1>
                <p className="subtitle" id="password">
                    Введите Dаш новый пароль
                </p>
                <TextField
                    onChange={(value) => controller.password1 = value}
                    hint="Введите ваш пароль"
                    value={controller.password1}
                    needErrorHandle={true}
                />
                <TextField
                    onChange={(value) => controller.password2 = value}
                    hint="Подтвердите ваш пароль"
                    value={controller.password2}
                    needErrorHandle={true}
                />

                <div className={`error ${controller.emailError ? "" : "close"}`}>
                    <div className="icon">!</div>
                    <span>{controller.emailError}</span>
                </div>

                <ConfirmButton
                    content="Сменить пароль"
                    onConfirm={() => { }}
                    borderRadius="7px"
                />
            </div>
        </main>
    </section>
}

export default observer(ResetPasswordPage);