import React from "react";
import { observer } from "mobx-react";
import AppointmentController from "../../controllers/appoint-controller";
import { TYPES, useInjection } from "../../../../container";
import formatServices from "@/services/format-services";

// Components
import Title from "@/modules/auth/components/title";
import Container from "@/modules/auth/components/container";
import Subtitle from "@/modules/auth/components/subtitle";
import SizedBox from "@/components/sized-box";
import DateTextField from "@/components/year-date-textfield";
import SexCheckbox from "@/components/sex-checkbox";
import TextField from "@/components/text-field";
import Calendar from "@/components/calendar";
import ConfirmButton from "@/components/confirm-button";

type Props = {
    className?: string;
}


const Page1: React.FC<Props> = ({ className }) => {
    const controller = useInjection<AppointmentController>(TYPES.appointController);

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
                    <TextField
                        onChange={(v) => controller.time = v}
                        value={controller.time}
                        hint="Введите время приема"
                        field="Время приёма" />
                </div>
                <div className="form-column">
                    <TextField
                        onChange={(v) => controller.phone = formatServices.formatPhone(v)}
                        value={controller.phone}
                        error={controller.phoneError}
                        hint="Введите Ваш телефон"
                        field="Телефон" />
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
            <div className="calendar-wrapper">
                <Calendar
                    isOpen={controller.calendarOpen}
                    onSave={controller.onCalendarSave}
                    onClose={() => controller.calendarOpen = false}
                />
            </div>
        </Container>
    </div>
}

export default observer(Page1);