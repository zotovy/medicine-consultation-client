import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import MediaQuery from "react-responsive";

// Stores
import signupUIStore from "../stores/signupUI";

// Components
import TextField from "../../../components/text-field";
import SizedBox from "../../../components/sized-box";

const Form = styled.div`
    display: flex;
    flex-direction: row;
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
`;

const SignupForm: React.FC = observer(() => {



    return <React.Fragment>
        <MediaQuery minDeviceWidth="768px">
            <Form>
                <FormColumn>
                    <TextField
                        error={signupUIStore.nameError}
                        onChange={(val: string) => signupUIStore.setName(val)}
                        value={signupUIStore.name}
                        validator={() => { }}
                        field={"Имя"}
                        hint={"Владимир"}
                        type={"text"}
                    />
                    <SizedBox height={"10px"} />
                    <TextField
                        error={signupUIStore.phoneError}
                        onChange={(val: string) => signupUIStore.setPhone(val)}
                        value={signupUIStore.phone}
                        validator={() => { }}
                        field={"Телефон"}
                        onFocus={signupUIStore.onPhoneFocus}
                        onBlur={signupUIStore.onPhoneBlur}
                        hint={"+7 932 332-73-51"}
                        type={"tel"}
                    />
                    <SizedBox height={"10px"} />
                    <TextField
                        error={signupUIStore.passwordError}
                        onChange={(val: string) => signupUIStore.setPassword(val)}
                        value={signupUIStore.password}
                        validator={() => { }}
                        field={"Пароль"}
                        hint={"••••••••••"}
                        type={"password"}
                        showPassword={signupUIStore.showPassword}
                        onShowPasswordChanged={signupUIStore.toggleShowPassword}
                    />
                </FormColumn>

                {/* 
        Second Column
*/}
                <FormColumn>
                    <TextField
                        error={signupUIStore.surnameError}
                        onChange={(val: string) => signupUIStore.setSurname(val)}
                        value={signupUIStore.surname}
                        validator={() => { }}
                        field={"Фамилия"}
                        hint={"Иванов"}
                        type={"text"}
                    />
                    <SizedBox height={"10px"} />
                    <TextField
                        error={signupUIStore.emailError}
                        onChange={(val: string) => signupUIStore.setEmail(val)}
                        value={signupUIStore.email}
                        validator={() => { }}
                        field={"Email"}
                        hint={"email@mail.com"}
                        type={"email"}
                    />
                    <SizedBox height={"10px"} />

                    <TextField
                        error={signupUIStore.confirmPasswordError}
                        onChange={(val: string) => signupUIStore.setConfirmPassword(val)}
                        value={signupUIStore.confirmPassword}
                        validator={() => { }}
                        field={"Подтвердите Пароль"}
                        hint={"••••••••••"}
                        type={"password"}
                    />
                </FormColumn>
            </Form>
        </MediaQuery>
        <MediaQuery maxDeviceWidth="767px">
            <TextField
                error={signupUIStore.nameError}
                onChange={signupUIStore.setName}
                value={signupUIStore.name}
                field={"Имя"}
                hint={"Владимир"}
                type={"text"}
            />
            <SizedBox height={"15px"} />
            <TextField
                error={signupUIStore.surnameError}
                onChange={signupUIStore.setSurname}
                value={signupUIStore.surname}
                validator={() => { }}
                field={"Фамилия"}
                hint={"Иванов"}
                type={"text"}
            />
            <SizedBox height={"15px"} />
            <TextField
                error={signupUIStore.phoneError}
                onChange={(val: string) => signupUIStore.setPhone(val)}
                value={signupUIStore.phone}
                validator={() => { }}
                field={"Телефон"}
                onFocus={signupUIStore.onPhoneFocus}
                onBlur={signupUIStore.onPhoneBlur}
                hint={"+7 932 332-73-51"}
                type={"tel"}
            />
            <SizedBox height={"15px"} />
            <TextField
                error={signupUIStore.emailError}
                onChange={(val: string) => signupUIStore.setEmail(val)}
                value={signupUIStore.email}
                validator={() => { }}
                field={"Email"}
                hint={"email@mail.com"}
                type={"email"}
            />
            <SizedBox height={"15px"} />
            <TextField
                error={signupUIStore.passwordError}
                onChange={(val: string) => signupUIStore.setPassword(val)}
                value={signupUIStore.password}
                validator={() => { }}
                field={"Пароль"}
                hint={"••••••••••"}
                type={"password"}
                showPassword={signupUIStore.showPassword}
                onShowPasswordChanged={signupUIStore.toggleShowPassword}
            />
            <SizedBox height={"15px"} />
            <TextField
                error={signupUIStore.confirmPasswordError}
                onChange={(val: string) => signupUIStore.setConfirmPassword(val)}
                value={signupUIStore.confirmPassword}
                validator={() => { }}
                field={"Подтвердите пароль"}
                hint={"••••••••••"}
                type={"password"}
            />
        </MediaQuery>
    </React.Fragment>


});



export default SignupForm;