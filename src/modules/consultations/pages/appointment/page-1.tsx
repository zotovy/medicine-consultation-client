import React from "react";
import { observer } from "mobx-react";
import controller from "../../controllers/appoint-controller";

// Components
import Title from "../../../auth/components/title";
import Container from "../../../auth/components/container";
import Subtitle from "../../../auth/components/subtitle";
import SizedBox from "../../../../components/sized-box";
import DateTextField from "../../../../components/year-date-textfield";
import SexCheckbox from "../../../../components/sex-checkbox";
import TextField from "../../../../components/text-field";
import Calendar from "../../../../components/calendar";
import ConfirmButton from "../../../../components/confirm-button";
import formatServices from "../../../../services/format-services";

type Props = {
    className?: string;
}


const Page1: React.FC<Props> = ({ className }) => {

    const styles = {
        calendarWrapper: {
            // zIndex: controller.calendarOpen ? "initial" as "initial" : -100,
        }
    }

    return <div className={`page page-1 ${className}`}>
        <Container>
            <Title text="Запись" />
            <SizedBox height="10px" />
            <Subtitle>Вам необходимо заполнить все недостающие данные для записи на консультацию</Subtitle>
            <SizedBox height="20px" />
            <div className="form">
                <div className="form-column">
                    <TextField
                        onChange={(v) => controller.fullName = v}
                        value={controller.fullName}
                        error={controller.fullNameError}
                        hint="Введите Ваше ФИО"
                        field="Как к вам обращаться?" />
                    <TextField
                        onChange={(v) => controller.birthDay = v}
                        value={controller.birthDay}
                        error={controller.birthDayError}
                        hint="Введите Вашу дату рождения"
                        field="Дата рождения" />
                </div>
                <div className="form-column">
                    <TextField
                        onChange={(v) => controller.phone = formatServices.formatPhone(v)}
                        value={controller.phone}
                        error={controller.phoneError}
                        hint="Введите Ваш телефон"
                        field="Телефон" />
                    <div style={styles.calendarWrapper} className="calendar-wrapper">
                        <Calendar
                            isOpen={controller.calendarOpen}
                            onSave={controller.onCalendarSave}
                            onClose={() => controller.calendarOpen = false}
                        />
                    </div>
                    <DateTextField
                        onChange={() => { }}
                        onFocus={() => controller.calendarOpen = true}
                        hint="Выберите дату приема"
                        field="Дата приёма"
                        value={controller.formattedAppointmentDate} />
                </div>

            </div>
            <SexCheckbox onChange={() => controller.isMale = !controller.isMale} isMale={controller.isMale} />
            <SizedBox height="40px" />
            <ConfirmButton content="Продолжить" onConfirm={() => controller.pageIndex = 1} />
        </Container>
    </div>
}

export default observer(Page1);