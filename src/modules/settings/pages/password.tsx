import React from "react";
import Navigation from "../components/navigation";
import { observer } from "mobx-react";
import ConfirmButton from "../../../components/confirm-button";
import { Link } from "react-router-dom";
import GoBackIcon from "../components/go-back-icon";

const ChangePasswordPage : React.FC = () => {
    return <main className="change-password-page settings-page">
        <Navigation active={5} />
        <GoBackIcon/>
        <section className="content change-password-page">
            <Link to="/">
                <ConfirmButton onConfirm={() => {}} content="Сменить пароль" />
            </Link>
        </section>
    </main>
}

export default observer(ChangePasswordPage);