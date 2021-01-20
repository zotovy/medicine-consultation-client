import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navigation from "../components/navigation";
import { observer } from "mobx-react";
import ConfirmButton from "../../../components/confirm-button";
import GoBackIcon from "../components/go-back-icon";
import TextField from "../../../components/text-field";
import controller from "../controllers/password-controller";

const ChangePasswordPage : React.FC = () => {

    const history = useHistory();
    useEffect(() => controller.redirectToLogin = () => {
        history.push("/login");
    }, []);

    return <main className="change-password-page settings-page">
        <Navigation active="/password" />
        <GoBackIcon/>
        <section className="content change-password-page">
            <div className="textfield-row" id="old-row">
                <TextField
                    onChange={(v) => controller.oldPassword = v}
                    hint={"••••••••••"}
                    type={"password"}
                    field={"Старый пароль"}
                    error={controller.oldPasswordError}
                />
            </div>
            <div className="textfield-row" id="new-row">
                <TextField
                    onChange={(v) => controller.newPassword = v}
                    hint={"••••••••••"}
                    type={"password"}
                    field={"Новый пароль"}
                    error={controller.newPasswordError}
                />
                <div className="space"/>
                <TextField
                    onChange={(v) => controller.confirmNewPassword = v}
                    hint={"••••••••••"}
                    type={"password"}
                    field={"Подтверждение нового пароль"}
                    error={controller.confirmNewPasswordError}
                />
            </div>
            <ConfirmButton onConfirm={controller.save} content={"Обновить пароль"} />
        </section>
    </main>
}

export default observer(ChangePasswordPage);