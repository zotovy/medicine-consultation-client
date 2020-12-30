import React from "react";
import { observer } from "mobx-react";

import controller from "../controllers/doctor-controller";
import formatServices from "../../../services/format-services";
import Navigation from "../components/navigation";
import GoBackIcon from "../components/go-back-icon";
import TextField from "../../../components/text-field";
import ConfirmButton from "../../../components/confirm-button";

const days: string[] = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const clickOnWorkingDays = (i: number) => { 
    if (controller.selectedDays.includes(i)) controller.selectedDays = controller.selectedDays.filter(e => e != i);
    else controller.selectedDays.push(i);
}

const DoctorSettingsPage = () => {
    return <main className="doctor-page settings-page">
        <Navigation active={5}/>
        <GoBackIcon/>
        <section className="content doctor">
            <div className="row">
                <TextField
                    field="Время начало консультаций"
                    error={controller.beginTimeError}
                    value={controller.consultationBeginTime}
                    onChange={(v) => controller.consultationBeginTime = formatServices.formatTime(v)}/>
                <div className="space"/>
                <TextField
                    field="Время конца консультаций"
                    error={controller.endTimeError}
                    value={controller.consultationEndTime}
                    onChange={(v) => controller.consultationEndTime = formatServices.formatTime(v)}/>
            </div>

            <span id="working-days">Рабочие дни</span>
            <div className="working-days">
                {
                    days.map((e, i) => <button
                        key={`${e}-day-button`}
                        onClick={() => clickOnWorkingDays(i)}
                        className={`day ${controller.selectedDays.includes(i) ? "selected" : ""}`}>
                        { e }
                    </button>)
                }
            </div>

            <TextField
                id="price-textfield"
                type="number"
                field="Стоимость консультации (₽)"
                error={controller.priceError}
                value={controller.price}
                onChange={controller.setPrice}/>
            <span id="under-price">{ controller.doctorWillGet }</span>

            <ConfirmButton onConfirm={controller.save} content="Сохранить"/>
        </section>
    </main>
}

export default observer(DoctorSettingsPage);