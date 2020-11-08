import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import "../styles.scss"
import NavigationComponent from "../components/navigation";
import { IconClass } from "../icons";
import TextField from "../../../components/text-field";
import SexCheckbox from "../../../components/sex-checkbox";
import ConfirmButton from "../../../components/confirm-button";
import DateTextField from "../../../components/year-date-textfield";
import Calendar from "../../../components/calendar";
import LoadingLine from "../../../components/loading-line";
import controller from "../controllers/account-controller";
import formatServices from "../../../services/format-services";
import UserPlaceholder from "../../../static/images/user-placeholder.jpg"
import token_services from "../../../services/token-services";



const SettingsAccountPage = () => {

    const history = useHistory();

    const handleErrors = (e : any) => {
        if (e === "logout") {
            token_services.removeTokens();
            history.push('/');
        }
        else if (e === "error") history.push('/error');
    }

    useEffect(() => {
        controller.fetchUser().catch(handleErrors);
    }, []);

    if (controller.isLoading) return <h1>Loading...</h1>

    const imgStyles = {backgroundImage: controller.profileImage
            ? `url(${controller.profileImage})`
            : `url(${UserPlaceholder})`};

    return <main className="account-page settings-page">
        {
            controller.isLoadingSave ? <LoadingLine/> : <React.Fragment/>
        }
        <NavigationComponent active={0}/>
        <section className="content account">
            <header>
                <div className="profile-image" style={imgStyles}>
                    <div className="icon-pick"><IconClass/></div>
                    <input
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                        multiple={false}
                        onChange={(e) => controller.changeProfilePic(e.target.files)}/>
                </div>
                <div className="info">
                    <h2 className="name">{ controller.fullName }</h2>
                    <span className="location">{ controller.location }</span>
                </div>
            </header>

            <div className="edit">
                <div className="column">
                    <TextField
                        onChange={(v) => controller.name = v}
                        field="Имя"
                        value={controller.name}
                        error={controller.nameError}
                    />
                    <TextField
                        onChange={(v) => controller.patronymic = v}
                        field="Отчество"
                        value={controller.patronymic}
                    />
                    <TextField
                        onChange={(v) => controller.email = v}
                        field="Email"
                        value={controller.email}
                        error={controller.emailError}
                    />
                    <TextField onChange={(v) => controller.country = v} field="Страна" value={controller.country}/>
                    <SexCheckbox onChange={() => controller.isMale = !controller.isMale} isMale={controller.isMale}/>
                    <ConfirmButton content="Cохранить" onConfirm={() => controller.saveAccountSettings().catch(handleErrors)}/>
                </div>

                <div className="gap"/>

                <div className="column">
                    <TextField
                        onChange={(v) => controller.surname = v}
                        field="Фамилия"
                        value={controller.surname}
                        error={controller.surnameError}
                    />
                    <TextField
                        onChange={(v) => controller.phone = v}
                        field="Телефон"
                        value={formatServices.formatPhone(controller.phone)}
                        error={controller.phoneError}
                    />
                    <div className="calendar-wrapper" style={{ zIndex: controller.isCalendarOpen ? 1 : -100 }}>
                        <Calendar
                            isOpen={controller.isCalendarOpen}
                            onClose={() => controller.isCalendarOpen = false}
                            onSave={(d) => {
                                controller.birthday = d
                                controller.isCalendarOpen = false;
                            }}
                        />
                    </div>
                    <DateTextField
                        field="День рождения"
                        onChange={() => null}
                        value={formatServices.formatDate(controller.birthday as Date)}
                        onFocus={() => controller.isCalendarOpen = true}
                    />
                    <TextField onChange={(v) => controller.city = v} field="Город" value={controller.city}/>
                </div>
            </div>
        </section>
    </main>;
};

export default observer(SettingsAccountPage);

