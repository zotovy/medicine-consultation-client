import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

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
    position:absolute;
    top: 0px;
    left: 155vw;
    transition: 1s;

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
    return <Page3 className={signupUIStore.pageIndex === 0 ? "" : signupUIStore.pageIndex === 1 ? "minus55" : "minus110"}>
        <Container>
            <Title text="Стать врачём" />
            <SizedBox height="10px" />
            <SubTitle>Почти готово! Заполните Ваши паспортные данные<br />и стаж медицинской работы</SubTitle>
            <SizedBox height="10px" />
            <Divider text="Паспортные данные" />
            <SizedBox height="5px" />
            <TextField
                error={signupUIStore.passportIssuedByWhomError}
                onChange={(val: string) => signupUIStore.setPassportIssuedByWhom(val)}
                value={signupUIStore.passportIssuedByWhom}
                validator={() => { }}
                field={"Кем выдан"}
                hint={"Отделом Внутренних Дел г.Москвы  "}
                type={"text"}
            />
            <Form>
                <FormColumn>
                    <TextField
                        error={signupUIStore.passportSeriesError}
                        onChange={(val: string) => signupUIStore.setPassportSeries(val)}
                        value={signupUIStore.passportSeries}
                        validator={() => { }}
                        field={"Серия"}
                        hint={"XX XX YYYYYY"}
                        type={"text"}
                    />

                </FormColumn>
                <FormColumn>
                    <TextField
                        error={signupUIStore.passportIssueDateError}
                        onChange={(val: string) => signupUIStore.setPassportIssueDate(val)}
                        value={signupUIStore.passportIssueDate}
                        validator={() => { }}
                        field={"Дата выдачи"}
                        hint={"21.11.2001"}
                        type={"text"}
                    />
                </FormColumn>
            </Form>
            <Divider text="Стаж работы" />
            <Form>
                <FormColumn>
                    <TextField
                        error={signupUIStore.workExperienceError}
                        onChange={(val: string) => signupUIStore.setWorkExperience(val)}
                        value={signupUIStore.workExperience}
                        validator={() => { }}
                        field={"Суммарный опыт работы"}
                        hint={"1 год"}
                        type={"text"}
                    />

                </FormColumn>
                <FormColumn>
                    <TextField
                        error={signupUIStore.workPlacesError}
                        onChange={(val: string) => signupUIStore.setWorkPlaces(val)}
                        value={signupUIStore.workPlaces}
                        validator={() => { }}
                        field={"Места работы"}
                        hint={'Клиника «Здоровье», Клиника «МедПлюс»'}
                        type={"text"}
                    />
                </FormColumn>
            </Form>

            <Row>
                <HalfOfWidth>
                    <ConfirmButton content="Зарегистрироваться" onConfirm={() => signupUIStore.setPageIndex(2)} />
                </HalfOfWidth>
                <SignupLink>
                    <span onClick={() => signupUIStore.setPageIndex(1)}>Вернуться назад</span>
                </SignupLink>
            </Row>
        </Container>
    </Page3>
}

export default observer(DSPage3);