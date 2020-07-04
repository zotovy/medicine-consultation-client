import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import classnames from "classnames";

// Stores
import signupUIStore from "../stores/signupUI";
import authStore from "../store";

// Components
import MediaQuery from 'react-responsive';
import SizedBox from "../../../components/sized-box";
import TextField from "../../../components/text-field";
import Title from "../components/title";
import SubTitle from "../components/subtitle";
import LinkComponent from "../components/link";
import Checkbox from "../../../components/checkbox";
import ConfirmButton from "../../../components/confirm-button";

// Static
import bgImage from "../../../static/images/signup-bg.png";
import "../styles.css";


const Wrapper = styled.div`
display: flex;
`;

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

  @media screen and (min-width: 424px) and (max-width: 768px) {
    width: calc(90vw / 2 - 50px);
    align-items: start;
  }
`;

const Image = styled.div`
  background-color: #dbecf4;
  width: 45vw;
  height: 100vh;

  .image {
    width: 100%;
    height: 100%;
    background: url(${bgImage});
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;
    background-position-y: center;
  }
`;

const ErrorAlertDialog = styled.div`
  top: 16px;
  right: 0;
  position: absolute;
  transition: 1s;
  width: 300px;
  display: flex;
  align-items: center;
  background: #ff3b30;
  padding: 10px;
  border-radius: 5px 0px 0px 5px;
  color: white;
`

const Container = styled.div`
  width: 45vw;
  padding-left: 50px;
  margin: 10px 0;
  flex-direction: column;
  display: flex;
  align-items: start;
  justify-content: center;

  @media screen and (min-width: 768px) {
    height: 100vh;
  }
  
  @media screen and (min-width: 424px) and (max-width: 768px) {
    width: 90vw;
    padding: 5vw;
  }

  @media screen and (max-width: 424px) {
    width: 86vw;
    padding: 7vw;
    align-items: center;
    overflow-y: scrollable;
    margin: 0 0 ;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 424px) {
    width: 100%;
  }
`;


const DoctorSignUpLinkComponentContainer = styled.div`
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: #30b9d6;
    text-decoration: none;
  }

  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  @media screen and (max-width: 424px) {
    text-align: center;
  }

  @media screen and (min-width: 425px) and (max-width: 768px) {
    width: 300px;
  }
`;




const UserSignUp: React.FC = observer(() => {


  // ANCHOR: hooks
  let history = useHistory();

  // ANCHOR: Reactions
  // Navigate to home page after login
  reaction(() => authStore.goToHomeTrigger, () => history.push("/"));


  // ANCHOR: Mobile styles
  const mobileStyles = {
    textField: {
      field: {
        fontSize: "16px",
      },
      input: {
        fontSize: "16px",

      },
    },
    subtitle: {
      textAlign: "center",
      fontSize: "18px",
    },

    checkbox: {
      text: {
        marginRight: "45px",
      },
    },
    secondCheckbox: {
      container: {
        alignItems: "start",
      }
    },
    DoctorSignUpLinkComponentContainer: {
      textAlign: "center",
    }
  }

  // ANCHOR: Tablet styles
  const tabletStyles = {
    title: {
      fontSize: "64px",
    },
    subtitle: {
      fontSize: "22px",
    },
    textField: {
      field: {
        fontSize: "20px",
      },

      input: {
        fontSize: "20px",
        padding: "15px",
        width: "calc(100% - 33px)",
        border: "solid 1.5px rgb(222,222,222)",
      },
    },
    link: {
      fontSize: "22px",
    },
    checkbox: {
      text: {
        fontSize: "18px",
        marginRight: "45px",
      },
    },
    confirmButton: {
      fontSize: "18px",
      padding: "15px 40px",
      width: "60%",
    },
    DoctorSignUpLinkComponentContainer: {
      textAlign: "center",
      width: "200px",
    }
  }

  return (
    <form>

      {/* ANCHOR iphone */}
      <MediaQuery maxDeviceWidth={424} >
        <Container>
          <Title text={"Регистрация"} />
          <SizedBox height={"10px"} />
          <SubTitle styles={mobileStyles.subtitle}>
            Зарегистрируйтесь, чтобы получить качественные медицинские консультации
          </SubTitle>
          <SizedBox height={"10px"} />
          <Link to={"/login"}>
            <LinkComponent centered={false}>
              Уже есть аккаунт? &nbsp; <a>Войти!</a>
            </LinkComponent>
          </Link>
          <SizedBox height={"10px"} />
          <TextField
            error={signupUIStore.nameError}
            styles={mobileStyles.textField}
            onChange={signupUIStore.setName}
            value={signupUIStore.name}
            field={"Имя"}
            hint={"Владимир"}
            type={"text"}
          />
          <SizedBox height={"15px"} />
          <TextField
            error={signupUIStore.surnameError}
            styles={mobileStyles.textField}
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
            styles={mobileStyles.textField}
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
            styles={mobileStyles.textField}
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
            styles={mobileStyles.textField}
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
            styles={mobileStyles.textField}
            onChange={(val: string) => signupUIStore.setConfirmPassword(val)}
            value={signupUIStore.confirmPassword}
            validator={() => { }}
            field={"Подтвердите пароль"}
            hint={"••••••••••"}
            type={"password"}
          />
          <SizedBox height={"15px"} />
          <div style={{ width: "100%" }}>
            <p className="field-name">Пол</p>
            <Row>
              <Checkbox
                styles={mobileStyles.checkbox}
                checked={signupUIStore.isMale}
                label={"Мужской"}
                onChange={() => signupUIStore.setIsMale(true)}
              />
              <Checkbox
                checked={!signupUIStore.isMale}
                label={"Женский"}
                onChange={() => signupUIStore.setIsMale(false)}
              />
            </Row>
          </div>
          <SizedBox height={"10px"} />
          <Row>
            <Checkbox
              styles={mobileStyles.secondCheckbox}
              checked={signupUIStore.agreeWithTerms}
              label={"Я согласен(-а) с "}
              linkText={"пользовательским соглашением"}
              onChange={() => signupUIStore.toggleAgreeWT()}
            />
          </Row>
          <SizedBox height={"10px"} />
          <Row>
            <Checkbox
              styles={mobileStyles.secondCheckbox}
              checked={signupUIStore.needMailing}
              label={"Я хочу получать уведомления на почту"}
              onChange={() => signupUIStore.toggleNeedMailing()}
            />
          </Row>
          <SizedBox height={"10px"} />
          <ConfirmButton
            styles={{
              button: {
                width: "calc(100% - 60px)",
                padding: "15px 30px",
                background: signupUIStore.agreeWithTerms ? "#30b9d6" : "#ccc",
              }
            }}
            onConfirm={authStore.signup}
            content={"Зарегистрироваться"}
            fullSize={false}
            size={"250px"}
          />
          <SizedBox height={"10px"} />
          <DoctorSignUpLinkComponentContainer>
            <a>Регистрация для Врачей</a>
          </DoctorSignUpLinkComponentContainer>


        </Container>

      </MediaQuery>

      {/* ANCHOR: tablet */}
      <MediaQuery maxDeviceWidth={1023} minDeviceWidth={425}>
        <Container>
          <Title text={"Регистрация"} styles={tabletStyles.title} />
          <SizedBox height={"15px"} />
          <SubTitle styles={tabletStyles.subtitle}>
            Зарегистрируйтесь для получения качественных онлайн консультаций в
            видео, аудио и текстовом формате.
          </SubTitle>
          <SizedBox height={"15px"} />
          <LinkComponent centered={false} styles={tabletStyles.link}>
            Уже есть аккаунт? &nbsp; <Link to={"/login"}><a>Войти!</a></Link>
          </LinkComponent>
          <SizedBox height={"10px"} />
          <Form>
            <FormColumn>
              <TextField
                error={signupUIStore.nameError}
                styles={tabletStyles.textField}
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
                styles={tabletStyles.textField}
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
                styles={tabletStyles.textField}
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
            <FormColumn>
              <TextField
                error={signupUIStore.surnameError}
                styles={tabletStyles.textField}
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
                styles={tabletStyles.textField}
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
                styles={tabletStyles.textField}
                onChange={(val: string) => signupUIStore.setConfirmPassword(val)}
                value={signupUIStore.confirmPassword}
                validator={() => { }}
                field={"Подтвердите Пароль"}
                hint={"••••••••••"}
                type={"password"}
              />
              {/* <PasswordStrengthBar password={"123"} /> */}
            </FormColumn>
          </Form>
          <SizedBox height={"10px"} />
          <p className="field-name">Пол</p>
          <Row>
            <Checkbox
              styles={tabletStyles.checkbox}
              checked={signupUIStore.isMale}
              label={"Мужской"}
              onChange={() => signupUIStore.setIsMale(true)}
            />
            <Checkbox
              styles={tabletStyles.checkbox}
              checked={!signupUIStore.isMale}
              label={"Женский"}
              onChange={() => signupUIStore.setIsMale(false)}
            />
          </Row>
          <SizedBox height={"10px"} />

          <Checkbox
            styles={tabletStyles.checkbox}
            checked={signupUIStore.agreeWithTerms}
            label={"Я согласен(-а) с "}
            linkText={"пользовательским соглашением"}
            onChange={() => signupUIStore.toggleAgreeWT()}
          />
          <SizedBox height={"10px"} />
          <Checkbox
            styles={tabletStyles.checkbox}
            checked={signupUIStore.needMailing}
            label={"Я хочу получать уведомления на почту"}
            onChange={() => signupUIStore.toggleNeedMailing()}
          />
          <SizedBox height={"10px"} />
          <Row>
            <ConfirmButton
              styles={{
                button: {
                  ...tabletStyles.confirmButton,
                  background: signupUIStore.agreeWithTerms ? "#30b9d6" : "#ccc",
                }
              }}
              onConfirm={authStore.signup}
              content={"Зарегистрироваться"}
              fullSize={false}
              size={"250px"}
            />
            <DoctorSignUpLinkComponentContainer>
              <a>Регистрация для Врачей</a>
            </DoctorSignUpLinkComponentContainer>
          </Row>
          <SizedBox height={"10px"} />

        </Container>
      </MediaQuery>

      {/* ANCHOR: Laptop */}
      <MediaQuery minDeviceWidth={1024} key={"mobile-desktop"}>
        <ErrorAlertDialog className={!signupUIStore.errorMessage ? "disable" : ""}>
          <i className={classnames("fa", "fa-exclamation-circle", "alert-icon")} aria-hidden="true"></i>
          <span className="alert-text">{signupUIStore.errorMessage}</span>
        </ErrorAlertDialog>
        <Wrapper>

          <Image>
            <div className="image"></div>
          </Image>

          <Container>
            <Title text={"Регистрация"} />
            <SizedBox height={"10px"} />
            <SubTitle >
              Зарегистрируйтесь для получения качественных онлайн консультаций в
              видео, аудио и текстовом формате.
            </SubTitle>
            <SizedBox height={"10px"} />
            <Link to={"/login"}>
              <LinkComponent centered={false}>
                Уже есть аккаунт? <span className="link">Войти!</span>
              </LinkComponent>
            </Link>
            <SizedBox height={"10px"} />

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

            <SizedBox height={"10px"} />
            <p className="field-name">Пол</p>
            <Row>
              <Checkbox
                styles={{ text: { marginRight: "30px", } }}
                checked={signupUIStore.isMale}
                label={"Мужской"}
                onChange={() => signupUIStore.setIsMale(true)}
              />
              <Checkbox
                checked={!signupUIStore.isMale}
                label={"Женский"}
                onChange={() => signupUIStore.setIsMale(false)}
              />
            </Row>
            <SizedBox height={"10px"} />

            <Checkbox
              checked={signupUIStore.agreeWithTerms}
              label={"Я согласен(-а) с "}
              linkText={"пользовательским соглашением"}
              onChange={() => signupUIStore.toggleAgreeWT()}
            />
            <SizedBox height={"10px"} />
            <Checkbox
              checked={signupUIStore.needMailing}
              label={"Я хочу получать уведомления на почту"}
              onChange={() => signupUIStore.toggleNeedMailing()}
            />
            <SizedBox height={"10px"} />
            <Row>
              <ConfirmButton
                styles={{
                  button: {
                    width: "initial",
                    padding: "15px 30px",
                    background: signupUIStore.agreeWithTerms ? "#30b9d6" : "#ccc",
                  }
                }}
                onConfirm={authStore.signup}
                content={"Зарегистрироваться"}
                fullSize={false}
                size={"250px"}
              />
              <DoctorSignUpLinkComponentContainer>
                <a>Регистрация для Врачей</a>
              </DoctorSignUpLinkComponentContainer>
            </Row>
            <SizedBox height={"10px"} />

          </Container>
        </Wrapper>

      </MediaQuery>
    </form >

  );
});

export default UserSignUp;
