import React from "react";

// Components
import Title from "../../../auth/components/title";
import Container from "../../../auth/components/container";
import Subtitle from "../../../auth/components/subtitle";
import SizedBox from "../../../../components/sized-box";
import DateTextField from "../../../auth/components/year-date-textfield";
import SexCheckbox from "../../../auth/components/sex-checkbox";
import TextField from "../../../../components/text-field";
import Calendar from "../../../../components/calendar";
import ConfirmButton from "../../../../components/confirm-button";

const Page1: React.FC = () => {

    const styles = {
        calendarWrapper: {
            zIndex: -100,
        }
    }

    return <div className="page page1">
        <Container>
            <Title text="Запись" />
            <SizedBox height="10px" />
            <Subtitle>Вам необходимо заполнить все недостающие данные для записи на консультацию</Subtitle>
            <SizedBox height="20px" />
            <div className="form">
                <div className="form-column">
                    <TextField
                        onChange={() => { }}
                        hint="Введите Ваше ФИО"
                        field="Как к вам обращаться?" />
                    <TextField
                        onChange={() => { }}
                        hint="Введите Вашу дату рождения"
                        field="Дата рождения" />
                    <SexCheckbox onChange={() => { }} isMale={true} />
                </div>
                <div className="form-column">
                    <TextField
                        onChange={() => { }}
                        hint="Введите Ваш телефон"
                        field="Телефон" />
                    <div style={styles.calendarWrapper} className="calendar-wrapper">
                        <Calendar isOpen={false} />
                    </div>
                    <DateTextField
                        onChange={() => { }}
                        hint="Выберите дату приема"
                        field="Дата приёма"
                        value="" />
                </div>
            </div>
            <SizedBox height="30px" />
            <ConfirmButton content="Продолжить" onConfirm={() => { }} />
        </Container>
    </div>
}

export default Page1;