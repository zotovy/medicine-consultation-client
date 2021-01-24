import React, { useEffect } from 'react';
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import { IconClass } from "@/static/icons";
import AccountController from "../controllers/account-controller";
import TextField from "@/components/text-field";
import SexCheckbox from "@/components/sex-checkbox";
import ConfirmButton from "@/components/confirm-button";
import DateTextField from "@/components/year-date-textfield";
import Calendar from "@/components/calendar";
import LoadingLine from "@/components/loading-line";
import formatServices from "@/services/format-services";
import token_services from "@/services/token-services";
import NavigationComponent from "../components/navigation";
import SettingsLoadingComponent from "../components/loading";
import GoBackIcon from "../components/go-back-icon";
import Menu from "../../../components/menu";
import { TYPES, useInjection } from "../../../container";


const SettingsAccountPage: NextPage = () => {
    const router = useRouter();
    const controller = useInjection<AccountController>(TYPES.accountController);

    const handleErrors = (e: any) => {
        console.log(e);
        if (e === "logout") {
            token_services.removeTokens();
            router.push('/');
        } else if (e === "error") router.push('/error');
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            controller.fetchUser().catch(handleErrors);
        }
    }, []);

    if (controller.isLoading) {
        return <SettingsLoadingComponent active="/account"/>
    }

    const imgStyles = {
        backgroundImage: controller.profileImage
            ? `url(${controller.profileImage})`
            : `url(../../../static/images/user-placeholder.jpg)`
    };

    return <React.Fragment>
        <Head>
            <title>Настройки – Аккаунт</title>
        </Head>
        <Menu/>
        <main className="account-page settings-page">
        {
            controller.isLoadingSave ? <LoadingLine/> : <React.Fragment/>
        }

        <NavigationComponent active="/account"/>
        <GoBackIcon/>
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
    </React.Fragment>
};

export default observer(SettingsAccountPage);

