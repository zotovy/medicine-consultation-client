import React, { useEffect } from "react";
import { observer } from "mobx-react";
import Head from "next/head";
import { NextPage } from "next";

import DoctorSettingsController from "../controllers/doctor-controller";
import FormatServices from "../../../services/format-services";
import Navigation from "../components/navigation";
import GoBackIcon from "../components/go-back-icon";
import TextField from "../../../components/text-field";
import ConfirmButton from "../../../components/confirm-button";
import SettingsLoadingComponent from "../components/loading";
import withController from "../../../utils/inject";
import { useInjection, TYPES } from "../../../container";

const days: string[] = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const clickOnWorkingDays = (controller: DoctorSettingsController, i: number) => {
    if (controller.selectedDays.includes(i)) controller.selectedDays = controller.selectedDays.filter(e => e != i);
    else controller.selectedDays.push(i);
}


const DoctorSettingsPage: NextPage = () => {
    const controller = useInjection<DoctorSettingsController>(TYPES.doctorSettingsController);

    useEffect(() => {
        controller.load();
    }, []);

    if (controller.isLoading) {
        return <SettingsLoadingComponent active="/doctor"/>
    }

    return <main className="doctor-page settings-page">
        <Head>
            <title>Настройки – Отзывы</title>
        </Head>
        <Navigation active="/doctor"/>
        <GoBackIcon/>
        <section className="content doctor">
            <div className="row">
                <TextField
                    field="Время начало консультаций"
                    error={controller.beginTimeError}
                    value={controller.consultationBeginTime}
                    onChange={(v) => controller.consultationBeginTime = FormatServices.formatTimeInput(v)}/>
                <div className="space"/>
                <TextField
                    field="Время конца консультаций"
                    error={controller.endTimeError}
                    value={controller.consultationEndTime}
                    onChange={(v) => controller.consultationEndTime = FormatServices.formatTimeInput(v)}/>
            </div>
            <div className="row">
                <TextField
                    field="Продолжительность консультации"
                    type="integer"
                    error={controller.consultationDurationError}
                    value={controller.consultationDuration}
                    onChange={(v) => controller.consultationDuration = v}/>
                <div className="space"/>
                <TextField
                    field="Пауза между консультациями"
                    type="integer"
                    error={controller.consultationPauseError}
                    value={controller.consultationPause}
                    onChange={(v) => controller.consultationPause = v}/>
            </div>

            <span id="working-days">Рабочие дни</span>
            <div className="working-days">
                {
                    days.map((e, i) => <button
                        key={`${e}-day-button`}
                        onClick={() => clickOnWorkingDays(controller, i)}
                        className={`day ${controller.selectedDays.includes(i) ? "selected" : ""}`}>
                        {e}
                    </button>)
                }
            </div>
            {
                !controller.workingDaysError || <div className="working-days_error">{controller.workingDaysError}</div>
            }

            <TextField
                id="price-textfield"
                type="number"
                field="Стоимость консультации (₽)"
                error={controller.priceError}
                value={controller.price}
                onChange={controller.setPrice}/>
            <span id="under-price">Вы будете получать {controller.doctorWillGet} за одну консультацию</span>

            <ConfirmButton onConfirm={controller.save} content="Сохранить"/>
        </section>
    </main>
}

export default withController(observer(DoctorSettingsPage), "doctorSettingsController");