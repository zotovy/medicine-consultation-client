import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";

// Stores
import signupUiStore from "../stores/signupUI";

// Components
import TextField from "../../../components/text-field";
import SizedBox from "../../../components/sized-box";
import withController from "../../../utils/inject";

const Form = styled.div`
    display: flex;
    flex-direction: row;

    /* Tablets & Phone */
    @media screen and (max-width: 424px) {
        flex-direction: column;
    }
`;

const FormColumn = styled.div`
    width: calc(50vw / 2 - 75px);
    max-width: 300px;
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    justify-content: start;

    /* Tablet */
    @media screen and (min-width: 424px) and (max-width: 1025px) {
        width: 50vw;
        align-items: start;
    }

    /* Phones */
    @media screen and (max-width: 424px) {
        width: 100%;
        margin-right: 0;
        max-width: 100%;
        justify-content: center;
    }  
`;

type Props = {
    signupUiStore: signupUiStore,
}

const SignupForm: React.FC<Props> = observer(({ signupUiStore }) => {
    return <Form>
        <FormColumn>
            <TextField
                error={signupUiStore.nameError}
                onChange={(val: string) => signupUiStore.setName(val)}
                value={signupUiStore.name}
                validator={() => { }}
                field={"Имя"}
                hint={"Владимир"}
                type={"text"}
                inputDataTest="name"
            />
            <SizedBox height={"10px"} />
            <TextField
                error={signupUiStore.phoneError}
                onChange={(val: string) => signupUiStore.setPhone(val)}
                value={signupUiStore.phone}
                validator={() => { }}
                field={"Телефон"}
                onFocus={signupUiStore.onPhoneFocus}
                onBlur={signupUiStore.onPhoneBlur}
                hint={"+7 932 332-73-51"}
                type={"tel"}
                inputDataTest="phone"
            />
            <SizedBox height={"10px"} />
            <TextField
                error={signupUiStore.passwordError}
                onChange={(val: string) => signupUiStore.setPassword(val)}
                value={signupUiStore.password}
                validator={() => { }}
                field={"Пароль"}
                hint={"••••••••••"}
                type={"password"}
                showPassword={signupUiStore.showPassword}
                onShowPasswordChanged={signupUiStore.toggleShowPassword}
                inputDataTest="password"
            />
        </FormColumn>
        <FormColumn>
            <TextField
                error={signupUiStore.surnameError}
                onChange={(val: string) => signupUiStore.setSurname(val)}
                value={signupUiStore.surname}
                validator={() => { }}
                field={"Фамилия"}
                hint={"Иванов"}
                type={"text"}
                inputDataTest="surname"
            />
            <SizedBox height={"10px"} />
            <TextField
                error={signupUiStore.emailError}
                onChange={(val: string) => signupUiStore.setEmail(val)}
                value={signupUiStore.email}
                validator={() => { }}
                field={"Email"}
                hint={"email@mail.com"}
                type={"email"}
                inputDataTest="email"
            />
            <SizedBox height={"10px"} />

            <TextField
                error={signupUiStore.confirmPasswordError}
                onChange={(val: string) => signupUiStore.setConfirmPassword(val)}
                value={signupUiStore.confirmPassword}
                validator={() => { }}
                field={"Подтвердите Пароль"}
                hint={"••••••••••"}
                type={"password"}
                inputDataTest="confirm-password"
                styles={{ input: { width: "100% !important" } }}
            />
        </FormColumn>
    </Form>



});



export default withController(SignupForm, "signupUiStore");