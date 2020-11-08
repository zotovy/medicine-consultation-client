import React from 'react';
import { observer } from "mobx-react";
import "../styles.scss"
import NavigationComponent from "../components/navigation";
import { IconClass } from "../icons";
import TextField from "../../../components/text-field";
import SexCheckbox from "../../../components/sex-checkbox";
import ConfirmButton from "../../../components/confirm-button";
import controller from "../controller";
import formatServices from "../../../services/format-services";


const SettingsAccountPage = () => {

    return <main className="account-page settings">
        <NavigationComponent active={0}/>
        <section className="content account">
            <header>
                <div className="profile-image">
                    <div className="icon-pick"><IconClass/></div>
                    <input type="file" accept="image/x-png,image/gif,image/jpeg"/>
                </div>
                <div className="info">
                    <h2 className="name">Сергей Сергеев</h2>
                    <span className="location">Новосибирск, Россия</span>
                </div>
            </header>

            <div className="edit">
                <div className="column">
                    <TextField onChange={(v) => controller.name = v} field="Имя" value={controller.name}/>
                    <TextField onChange={(v) => controller.patronymic = v} field="Отчество" value={controller.patronymic}/>
                    <TextField onChange={(v) => controller.email = v} field="Email" value={controller.email}/>
                    <TextField onChange={(v) => controller.country = v} field="Страна" value={controller.country}/>
                    <SexCheckbox onChange={() => controller.isMale = !controller.isMale} isMale={controller.isMale} />
                    <ConfirmButton content="Сохранить" onConfirm={() => {}} />
                </div>

                <div className="gap"/>

                <div className="column">
                    <TextField onChange={(v) => controller.surname = v} field="Фамилия" value={controller.surname}/>
                    <TextField onChange={(v) => controller.phone = v} field="Телефон" value={formatServices.formatPhone(controller.phone)}/>
                    <TextField onChange={() => {}} field="Телефон" value={formatServices.formatDate(controller.birthday)}/>
                    <TextField onChange={(v) => controller.city = v} field="Город" value={controller.city}/>
                </div>
            </div>
        </section>
    </main>;
};

export default observer(SettingsAccountPage);

