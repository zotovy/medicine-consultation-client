import React from "react";
import Navigation from "../components/navigation";
import { observer } from "mobx-react";
import TextField from "../../../components/text-field";
import ConfirmButton from "../../../components/confirm-button";
import { Link } from "react-router-dom";

const ChangePasswordPage : React.FC = () => {
    return <main className="change-password-page settings-page">
        <Navigation active={4} />
        <section className="content change-password-page">
            <div className="row">
                <TextField
                    onChange={() => {}}
                    field="Старый пароль"
                    type="password"
                />
            </div>
            <div className="row">
                <TextField
                    onChange={() => {}}
                    field="Новый пароль"
                    type="password"
                />
                <TextField
                    onChange={() => {}}
                    field="Подтвердите новый пароль"
                    type="password"
                />
            </div>

            <div className="row start">
                <ConfirmButton onConfirm={() => {}} content="Сменить пароль" />
                <Link to="/">
                    <span className="forgot-password">Забыли пароль?</span>
                </Link>
            </div>
        </section>
    </main>
}

export default observer(ChangePasswordPage);