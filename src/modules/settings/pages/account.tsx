import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { Link, useHistory } from "react-router-dom";
import "../styles.scss"
import NavigationComponent from "../components/navigation";
import { BackIcon, IconClass } from "../icons";
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
import SettingsLoadingComponent from "../components/loading";
import MediaQuery from "react-responsive";


const SettingsAccountPage = () => {

    const history = useHistory();

    const handleErrors = (e: any) => {
        console.log(e);
        if (e === "logout") {
            token_services.removeTokens();
            history.push('/');
        } else if (e === "error") history.push('/error');
    }

    useEffect(() => {
        controller.fetchUser().catch(handleErrors);
    }, []);

    if (controller.isLoading) {
        return <SettingsLoadingComponent active={0}/>
    }

    const imgStyles = {
        backgroundImage: controller.profileImage
            ? `url(${controller.profileImage})`
            : `url(${UserPlaceholder})`
    };

    return <main className="account-page settings-page">
        {
            controller.isLoadingSave ? <LoadingLine/> : <React.Fragment/>
        }

        <MediaQuery minWidth={425}>
            <NavigationComponent active={0}/>
        </MediaQuery>

        <section className="content account">

            <MediaQuery maxWidth={425}>
                <div className="back-icon">
                   <Link to="/settings">
                       <BackIcon/>
                   </Link>
                </div>
            </MediaQuery>

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
                    <h2 className="name">{controller.fullName}</h2>
                    <span className="location">{controller.location}</span>
                </div>
            </header>

            <div className="edit">
                <div className="row">
                    <TextField
                        onChange={(v) => controller.name = v}
                        field="Имя"
                        value={controller.name}
                        error={controller.nameError}
                    />
                    <div className="row-gap"/>
                    <TextField
                        onChange={(v) => controller.surname = v}
                        field="Фамилия"
                        value={controller.surname}
                        error={controller.surnameError}
                    />
                </div>

                <div className="row">
                    <TextField
                        onChange={(v) => controller.patronymic = v}
                        field="Отчество"
                        value={controller.patronymic}
                    />
                    <div className="row-gap"/>
                    <TextField
                        onChange={(v) => controller.phone = v}
                        field="Телефон"
                        value={formatServices.formatPhone(controller.phone)}
                        error={controller.phoneError}
                    />
                </div>

                <div className="row">
                    <TextField
                        onChange={(v) => controller.email = v}
                        field="Email"
                        value={controller.email}
                        error={controller.emailError}
                    />
                    <div className="row-gap"/>
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
                </div>

                <div className="row">
                    <TextField onChange={(v) => controller.country = v} field="Страна" value={controller.country}/>
                    <div className="row-gap"/>
                    <TextField onChange={(v) => controller.city = v} field="Город" value={controller.city}/>
                </div>


                <SexCheckbox onChange={() => controller.isMale = !controller.isMale} isMale={controller.isMale}/>
                <ConfirmButton
                    content="Cохранить"
                    onConfirm={() => controller.saveAccountSettings().catch(handleErrors)}
                />
            </div>


        </section>
    </main>;
};

export default observer(SettingsAccountPage);

