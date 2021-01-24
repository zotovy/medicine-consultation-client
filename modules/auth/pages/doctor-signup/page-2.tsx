import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import MediaQuery from 'react-responsive';

// Store
import SignupUIStore from "../../stores/signupUI";

// Components
import Container from "../../components/container";
import Title from "../../components/title";
import SizedBox from "../../../../components/sized-box";
import SubTitle from "../../components/subtitle";
import TextField from "../../../../components/text-field";
import ConfirmButton from "../../../../components/confirm-button";
import SignupLink from "../../components/signup-link";
import Divider from "../../components/divider";
import DateTextField from "../../../../components/year-date-textfield";
import Calendar from "../../../../components/calendar";
import withController from "../../../../utils/inject";



const Page2 = styled.div`
    position:absolute;
    top: 0px;
    left: 100vw;
    transition: 1s;

    @media screen and (max-width: 1024px) {
        left: 100vw;
    }
`

const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media screen and (max-width: 424px) {
        flex-direction: column;
    } 
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

    /* Phone */
    @media screen and (max-width: 424px) {
        width: 100%;
    } 
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


const HalfOfWidth = styled.div`
    width: 50%;

    /* Phone */
    @media screen and (max-width: 424px) {
        width: 100%;
        margin-bottom: 10px;
    } 
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 20px;

    /** Phone */
    @media screen and (max-width: 426px) {
        flex-direction: column;
    }
`

type Props = {
    signupUiStore: SignupUIStore
}

const DSPage2: React.FC<Props> = ({ signupUiStore }) => {

    return <Page2 className={signupUiStore.pageIndex === 0 ? "" : signupUiStore.pageIndex === 1 ? "minus55" : "minus110"}>

        <Container >
            <Title text="Стать врачём" />
            <SizedBox height="10px" />
            <SubTitle>Чтобы допустить вас на платформу нам необходимы данные о вашем медицинском образовании</SubTitle>
            <SizedBox height="10px" />
            <TextField
                error={signupUiStore.instituteError}
                onChange={signupUiStore.setInstitute}
                value={signupUiStore.institute}
                validator={() => { }}
                field={"Образование"}
                hint={"Медицинский колледж №1 г. Москва"}
                type={"text"}
            />

            <Form>
                <FormColumn>
                    <TextField
                        error={signupUiStore.specialityError}
                        onChange={signupUiStore.setSpeciality}
                        value={signupUiStore.speciality}
                        validator={() => { }}
                        field={"Специальность"}
                        hint={"Терапевт"}
                        type={"text"}
                    />
                </FormColumn>
                <FormColumn>
                    <TextField
                        error={signupUiStore.studyYearsError}
                        onChange={signupUiStore.setStudyYears}
                        value={signupUiStore.studyYears}
                        validator={() => { }}
                        field={"Годы обучения"}
                        hint="2015 - 2020"
                        type={"text"}
                    />
                </FormColumn>
            </Form>


            <Divider text="Диплом" />

            <Form>
                <FormColumn>
                    <TextField
                        error={signupUiStore.blankSeriesError}
                        onChange={signupUiStore.setBlankSeries}
                        value={signupUiStore.blankSeries}
                        validator={() => { }}
                        field={"Серия бланка"}
                        hint={"107777"}
                        type={"text"}
                    />
                    <CalendarWrapper style={{ zIndex: signupUiStore.isCalendarExist ? 1 : -100 }}>
                        <Calendar
                            onSave={signupUiStore.onCalendarDateSelected}
                            isOpen={signupUiStore.isCalendarOpen}
                            onClose={signupUiStore.onCalendarClose}
                        />
                    </CalendarWrapper>

                    <DateTextField
                        error={signupUiStore.issueDateError}
                        onChange={() => { }}
                        value={signupUiStore.issueDate}
                        field={"Дата выдачи"}
                        hint={"21 / 11 / 2019"}
                        onFocus={signupUiStore.onCalendarOpen}
                    />


                </FormColumn>
                <FormColumn>
                    <TextField
                        error={signupUiStore.blankNumberError}
                        onChange={signupUiStore.setBlankNumber}
                        value={signupUiStore.blankNumber}
                        validator={() => { }}
                        field={"Номер бланка"}
                        hint={"0253595"}
                        type={"text"}
                    />
                </FormColumn>
            </Form>

            <MediaQuery minDeviceWidth="424px" >
                <SizedBox height="20px" />
            </MediaQuery>
            <MediaQuery maxDeviceWidth="424px" >
                <SizedBox height="10px" />
            </MediaQuery>



            <Row>
                <HalfOfWidth>
                    <ConfirmButton content="Продолжить" onConfirm={signupUiStore.goNextPage} />
                </HalfOfWidth>
                <SignupLink>
                    <span onClick={signupUiStore.goBeforePage}>Вернуться назад</span>
                </SignupLink>
            </Row>
        </Container>
    </Page2>
}

export default withController(observer(DSPage2), "signupUiStore");