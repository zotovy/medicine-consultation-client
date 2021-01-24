import React, { useEffect } from "react";
import { useRouter} from "next/router";
import { NextPage } from "next";
import Menu from "@/components/menu";
import PasswordController from "../controllers/password-controller";
import Navigation from "../components/navigation";
import { observer } from "mobx-react";
import ConfirmButton from "@/components/confirm-button";
import GoBackIcon from "../components/go-back-icon";
import TextField from "@/components/text-field";
import withController from "@/utils/inject";

type ControllerProps = { passwordController: PasswordController };

const ChangePasswordPage: NextPage<ControllerProps> = (props) => {
    const controller = props.passwordController;
    const router = useRouter();
    useEffect(() => {
        controller.redirectToLogin = () => {
            router.push("/login");
        };
    }, []);

    return <React.Fragment>
        <Menu/>
        <main className="change-password-page settings-page">
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
    </React.Fragment>
}

export default withController(observer(ChangePasswordPage), "passwordController");