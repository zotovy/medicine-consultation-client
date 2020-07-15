import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import MediaQuery from 'react-responsive';

// Store
import signupUIStore from "../../stores/signupUI";

// Components
import Container from "../../components/container";
import Title from "../../components/title";
import SizedBox from "../../../../components/sized-box";
import SubTitle from "../../components/subtitle";
import TextField from "../../../../components/text-field";
import ConfirmButton from "../../../../components/confirm-button";
import SignupLink from "../../components/signup-link";
import Divider from "../../components/divider";
import DateTextField from "../../components/year-date-textfield";
import Calendar from "../../../../components/calendar";



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

    /** Phone */
    @media screen and (max-width: 426px) {
        flex-direction: column;
    }
`

const DSPage2: React.FC = () => {
    return <Page2 className={signupUIStore.pageIndex === 0 ? "" : signupUIStore.pageIndex === 1 ? "minus55" : "minus110"}>

        <Container >
            <Title text="Стать врачём" />
            <SizedBox height="10px" />
            <SubTitle>Чтобы допустить вас на платформу нам необходимы данные о вашем медицинском образовании</SubTitle>
            <SizedBox height="10px" />
            <TextField
                error={signupUIStore.instituteError}
                onChange={signupUIStore.setInstitute}
                value={signupUIStore.institute}
                validator={() => { }}
                field={"Образование"}
                hint={"Медицинский колледж №1 г. Москва"}
                type={"text"}
            />

            <Form>
                <FormColumn>
                    <TextField
                        error={signupUIStore.specialityError}
                        onChange={signupUIStore.setSpeciality}
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


            <Divider text="Диплом" />

            <Form>
                <FormColumn>
                    <TextField
                        error={signupUIStore.blankSeriesError}
                        onChange={signupUIStore.setBlankSeries}
                        value={signupUIStore.blankSeries}
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
                        error={signupUIStore.blankNumberError}
                        onChange={signupUIStore.setSpeciality}
                        value={signupUIStore.blankNumber}
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
                    <ConfirmButton content="Продолжить" onConfirm={() => signupUIStore.setPageIndex(2)} />
                </HalfOfWidth>
                <SignupLink>
                    <span onClick={() => signupUIStore.setPageIndex(0)}>Вернуться назад</span>
                </SignupLink>
            </Row>
        </Container>
    </Page2>
}

export default observer(DSPage2);