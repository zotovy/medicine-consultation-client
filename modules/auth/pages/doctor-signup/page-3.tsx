import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { TYPES, useInjection } from "../../../../container";

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
import withController from "../../../../utils/inject";


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

const Page3 = styled.div`
    position: absolute;
    top: 0px;
    left: 155vw;
    transition: 1s;
    margin-top: 20px;

    @media screen and (max-width: 1024px) {
        left: 200vw;
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

const HalfOfWidth = styled.div`
    width: 50%;

    /* Phone */
    @media screen and (max-width: 424px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;


const DSPage3: React.FC = () => {
    const signupUiStore = useInjection<SignupUIStore>(TYPES.signupUiStore);

    return <Page3
            data-test="page-3"
            className={signupUiStore.pageIndex === 0 ? "" : signupUiStore.pageIndex === 1 ? "minus55" : "minus110"}>
        <Container>
            <Title text="Стать врачём"/>
            <SizedBox height="10px"/>
            <SubTitle>Почти готово! Заполните Ваши паспортные данные<br/>и стаж медицинской работы</SubTitle>
            <SizedBox height="10px"/>
            <Divider text="Паспортные данные"/>
            <SizedBox height="5px"/>
            <TextField
                    inputDataTest="issuedByWhom"
                    error={signupUiStore.passportIssuedByWhomError}
                    onChange={(val: string) => signupUiStore.setPassportIssuedByWhom(val)}
                    value={signupUiStore.passportIssuedByWhom}
                    validator={() => {
                    }}
                    field={"Кем выдан"}
                    hint={"Отделом Внутренних Дел г.Москвы  "}
                    type={"text"}
            />
            <Form>
                <FormColumn>
                    <TextField
                            inputDataTest="series"
                            error={signupUiStore.passportSeriesError}
                            onChange={(val: string) => signupUiStore.setPassportSeries(val)}
                            value={signupUiStore.passportSeries}
                            validator={() => {
                            }}
                            field={"Серия"}
                            hint={"XX XX YYYYYY"}
                            type={"text"}
                    />

                </FormColumn>
                <FormColumn>
                    <TextField
                            inputDataTest="issueDate"
                            error={signupUiStore.passportIssueDateError}
                            onChange={(val: string) => signupUiStore.setPassportIssueDate(val)}
                            value={signupUiStore.passportIssueDate}
                            validator={() => {
                            }}
                            field={"Дата выдачи"}
                            hint={"21.11.2001"}
                            type={"text"}
                    />
                </FormColumn>
            </Form>
            <Divider text="Стаж работы"/>
            <Form>
                <FormColumn>
                    <TextField
                            inputDataTest="experience"
                            error={signupUiStore.workExperienceError}
                            onChange={(val: string) => signupUiStore.setWorkExperience(val)}
                            value={signupUiStore.workExperience}
                            validator={() => {
                            }}
                            field={"Суммарный опыт работы"}
                            hint={"1 год"}
                            type={"text"}
                    />

                </FormColumn>
                <FormColumn>
                    <TextField
                            inputDataTest="work-place"
                            error={signupUiStore.workPlacesError}
                            onChange={(val: string) => signupUiStore.setWorkPlaces(val)}
                            value={signupUiStore.workPlaces}
                            validator={() => {
                            }}
                            field={"Места работы"}
                            hint={'Клиника «Здоровье», Клиника «МедПлюс»'}
                            type={"text"}
                    />
                </FormColumn>
            </Form>

            <Row>
                <HalfOfWidth>
                    <ConfirmButton dataTest="confirm-3" content="Зарегистрироваться" onConfirm={signupUiStore.doctorSignup}/>
                </HalfOfWidth>
                <SignupLink>
                    <span onClick={signupUiStore.goBeforePage}>Вернуться назад</span>
                </SignupLink>
            </Row>
        </Container>
    </Page3>
}

export default withController(observer(DSPage3), "signupUiStore");
