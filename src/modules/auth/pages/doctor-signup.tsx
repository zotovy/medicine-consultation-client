import React from "react";
import { Link as Linker } from "react-router-dom";
import { observer } from "mobx-react";
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import classnames from "classnames";

// Components
import Title from "../components/title";
import SubTitle from "../components/subtitle";
import Link from "../components/link";
import SizedBox from "../../../components/sized-box";
import ConfirmButton from "../../../components/confirm-button";
import DateInput from "../../../components/date-input";
import TextField from "../../../components/text-field";
import SignUpForm from "../components/signup-form";
import SignupLink from "../components/signup-link";
import Container from "../components/container";
import SexCheckbox from "../components/sex-checkbox";
import Image from "../components/image";
import Divider from "../components/divider";
import DateTextField from "../components/year-date-textfield";

// Store
import signupUIStore from "../stores/signupUI";

// Static
import "../../../static/index.css";
import Calendar from "../../../components/calendar";


const Wrapper = styled.div`
    display: flex;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 426px) {
        flex-direction: column;
    }
`

const Swapper = styled.div`
    width: 55vw;
    height: 100%;
    overflow: hidden;

    @media screen and (max-width: 1024px) {
        width: 100vw;
    }
`;

const Page1 = styled.div`
    position:relative;
    left: 0px;
    transition: 1s;
`;

const Page2 = styled.div`
    position:absolute;
    top: 0px;
    left: 100vw;
    transition: 1s;
    z-index: 1;

    @media screen and (max-width: 1024px) {
        left: 100vw;
       
    }
`

const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const FormColumn = styled.div`
    width: calc(50% - 30px);
    display: flex;
    flex-direction: column;
    justify-content: start;

    /* Desktop */
    @media screen and (min-width: 1025px) {
        max-width: 300px;
    }

    /* Tablet */
    @media screen and (min-width: 424px) and (max-width: 1025px) {
        width: 40vw;
        align-items: start;
    }


`;

const HalfOfWidth = styled.div`
    width: 50%;
`;

const CalendarWrapper = styled.div`
    position: absolute;
    bottom: calc(50vh - 150px);
    left: 50px;

    /* Tablet */
    @media screen and (max-width: 424px) {
        left: 15px;
        right: 15px;
    }
`;


const DoctorSignUp: React.FC = () => {
    return <Wrapper>
        <MediaQuery minDeviceWidth="1025px"><Image /></MediaQuery>
        <Swapper>
            <Page1 className={signupUIStore.pageIndex === 1 ? "minus100" : ""} >
                <Container>
                    <Title text="Стать врачём" />
                    <SizedBox height="10px" />
                    <SubTitle>Зарегистрируйтесь как врач для того, чтобы иметь возможность предоставлять свои медицинские услуги</SubTitle>
                    <SizedBox height="10px" />
                    <Link>Уже есть аккаунт? <span className="link">Войти!</span></Link>
                    <SizedBox height="10px" />
                    <SignUpForm />
                    <SexCheckbox isMale={signupUIStore.isMale} onChange={signupUIStore.toggleIsMale} />
                    <SizedBox height="15px" />

                    <MediaQuery maxDeviceWidth="435px">
                        <ConfirmButton content="Продолжить" onConfirm={() => signupUIStore.setPageIndex(1)} />
                        <SizedBox height="10px" />
                        <Linker to="/signup">
                            <SignupLink><a href="#">Регистрация для пользователей</a></SignupLink>
                        </Linker>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth="436px">
                        <Row>
                            <HalfOfWidth>
                                <ConfirmButton content="Продолжить" onConfirm={() => signupUIStore.setPageIndex(1)} />
                            </HalfOfWidth>
                            <Linker to="/signup">
                                <SignupLink><a href="#">Регистрация для пользователей</a></SignupLink>
                            </Linker>
                        </Row>
                    </MediaQuery>
                </Container>
            </Page1>
            <Page2 className={signupUIStore.pageIndex === 1 ? "minus55" : ""}>

                <Container >
                    <Title text="Стать врачём" />
                    <SizedBox height="10px" />
                    <SubTitle>Зарегистрируйтесь как врач для того, чтобы иметь возможность предоставлять свои медицинские услуги</SubTitle>
                    <SizedBox height="10px" />
                    <Linker to="/login">
                        <Link>Уже есть аккаунт? <span className="link">Войти!</span></Link>
                    </Linker>
                    <SizedBox height="10px" />
                    <TextField
                        error={signupUIStore.institute}
                        onChange={(val: string) => signupUIStore.setInstitute(val)}
                        value={signupUIStore.institute}
                        validator={() => { }}
                        field={"Образование"}
                        hint={"Медицинский колледж №1 г. Москва"}
                        type={"text"}
                    />


                    <MediaQuery maxDeviceWidth="424px" >
                        <TextField
                            error={signupUIStore.speciality}
                            onChange={(val: string) => signupUIStore.setSpeciality(val)}
                            value={signupUIStore.speciality}
                            validator={() => { }}
                            field={"Специальность"}
                            hint={"Терапевт"}
                            type={"text"}
                        />
                        <TextField
                            error={signupUIStore.studyYearsError}
                            onChange={signupUIStore.setStudyYears}
                            value={signupUIStore.studyYears}
                            validator={() => { }}
                            field={"Годы обучения"}
                            hint="2015 - 2020"
                            type={"text"}
                        />
                    </MediaQuery>

                    <MediaQuery minDeviceWidth="424px" >
                        <Form>
                            <FormColumn>
                                <TextField
                                    error={signupUIStore.speciality}
                                    onChange={(val: string) => signupUIStore.setSpeciality(val)}
                                    value={signupUIStore.speciality}
                                    validator={() => { }}
                                    field={"Специальность"}
                                    hint={"Терапевт"}
                                    type={"text"}
                                />
                            </FormColumn>
                            <FormColumn>
                                <TextField
                                    error={signupUIStore.studyYearsError}
                                    onChange={signupUIStore.setStudyYears}
                                    value={signupUIStore.studyYears}
                                    validator={() => { }}
                                    field={"Годы обучения"}
                                    hint="2015 - 2020"
                                    type={"text"}
                                />
                            </FormColumn>
                        </Form>
                    </MediaQuery>


                    <Divider text="Диплом" />
                    <MediaQuery maxDeviceWidth="424px">
                        <SizedBox height="5px" />

                        <TextField
                            error={signupUIStore.blankSeries}
                            onChange={(val: string) => signupUIStore.setSpeciality(val)}
                            value={signupUIStore.speciality}
                            validator={() => { }}
                            field={"Серия бланка"}
                            hint={"107777"}
                            type={"text"}
                        />
                        <CalendarWrapper style={{ zIndex: signupUIStore.isCalendarExist ? 1 : -100 }}>
                            <Calendar
                                onSave={signupUIStore.onCalendarDateSelected}
                                isOpen={signupUIStore.isCalendarOpen}
                                onClose={signupUIStore.onCalendarClose}
                            />
                        </CalendarWrapper>
                        <DateTextField
                            error={signupUIStore.issueDateError}
                            onChange={() => { }}
                            value={signupUIStore.issueDate}
                            field={"Дата выдачи"}
                            hint={"21 / 11 / 2019"}
                            onFocus={signupUIStore.onCalendarOpen}
                        />
                        <TextField
                            error={signupUIStore.blankSeries}
                            onChange={(val: string) => signupUIStore.setSpeciality(val)}
                            value={signupUIStore.speciality}
                            validator={() => { }}
                            field={"Номер бланка"}
                            hint={"0253595"}
                            type={"text"}
                        />
                    </MediaQuery>

                    <MediaQuery minDeviceWidth="424px" >
                        <Form>
                            <FormColumn>
                                <TextField
                                    error={signupUIStore.blankSeries}
                                    onChange={(val: string) => signupUIStore.setSpeciality(val)}
                                    value={signupUIStore.speciality}
                                    validator={() => { }}
                                    field={"Серия бланка"}
                                    hint={"107777"}
                                    type={"text"}
                                />
                                <CalendarWrapper style={{ zIndex: signupUIStore.isCalendarExist ? 1 : -100 }}>
                                    <Calendar
                                        onSave={signupUIStore.onCalendarDateSelected}
                                        isOpen={signupUIStore.isCalendarOpen}
                                        onClose={signupUIStore.onCalendarClose}
                                    />
                                </CalendarWrapper>

                                <DateTextField
                                    error={signupUIStore.issueDateError}
                                    onChange={(val: string) => { }}
                                    value={signupUIStore.issueDate}
                                    field={"Дата выдачи"}
                                    hint={"21 / 11 / 2019"}
                                    onFocus={signupUIStore.onCalendarOpen}
                                />


                            </FormColumn>
                            <FormColumn>
                                <TextField
                                    error={signupUIStore.blankSeries}
                                    onChange={(val: string) => signupUIStore.setSpeciality(val)}
                                    value={signupUIStore.speciality}
                                    validator={() => { }}
                                    field={"Номер бланка"}
                                    hint={"0253595"}
                                    type={"text"}
                                />
                            </FormColumn>
                        </Form>
                    </MediaQuery>

                    <MediaQuery minDeviceWidth="424px" >
                        <SizedBox height="20px" />
                    </MediaQuery>
                    <MediaQuery maxDeviceWidth="424px" >
                        <SizedBox height="10px" />
                    </MediaQuery>


                    <MediaQuery maxDeviceWidth="435px">
                        <ConfirmButton content="Продолжить" onConfirm={() => signupUIStore.setPageIndex(0)} />
                        <SizedBox height="10px" />
                        <Linker to="/signup">
                            <SignupLink><a href="#">Регистрация для пользователей</a></SignupLink>
                        </Linker>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth="436px">
                        <Row>
                            <HalfOfWidth>
                                <ConfirmButton content="Продолжить" onConfirm={() => signupUIStore.setPageIndex(0)} />
                            </HalfOfWidth>
                            <Linker to="/signup">
                                <SignupLink><a href="#">Регистрация для пользователей</a></SignupLink>
                            </Linker>
                        </Row>
                    </MediaQuery>
                </Container>
            </Page2>
        </Swapper>
    </Wrapper >
}

export default observer(DoctorSignUp);