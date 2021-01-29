import React, { useEffect } from "react";
import { toJS } from "mobx";
import Slider from "../components/symptoms/doctors";
import Title from "@/components/title";
import { observer } from "mobx-react";
import SymptomsTabs from '../components/symptoms/tabs'
import ConfirmButton from '@/components/confirm-button';
import SymptomsChoice from '../components/symptoms/choice';
import ErrorBadge from '@/components/error-badge';
import SympController from "../controllers/symptoms-controller";
import { TYPES, useInjection } from "../../../container";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Menu from "@/components/menu";
import Head from "next/head";


const SymptomsPage: NextPage = () => {
    const controller = useInjection<SympController>(TYPES.symptomsController);
    let { handlerClick, doctors } = controller,
        cloneDoctors = toJS(doctors);
    const router = useRouter();

    useEffect(() => {
        controller.clickHandlerSymp();
    })

    if (controller.canFindDoctors && cloneDoctors.length === 0) {
        router.push("/symp-error");
        return <React.Fragment/>
    }

    return <React.Fragment>
        <Menu/>
        <Head>
            <title>Симптомы</title>
        </Head>
        <ErrorBadge
            isOpen={controller.isErrorBadgeOpen}
            message="Произошла непридвиденная ошибка. Мы уже работаем над этим!"
        />
        <ErrorBadge
            isOpen={controller.isErrorBadgeOpenCh}
            message="Выберите симптомы, которые Вас беспокоят."
        />
        {
            controller.canFindDoctors
                ? <Slider/>
                : <div className="symptoms-wrapper">
                    <Title title="Симптомы" mark="."/>
                    <h3 className="symptoms-subtitle">Выберите симптомы, которые Вас беспокоят.<br/> Мы поможем
                        легко Вам подобрать нужного врача!</h3>
                    <div className="symptoms-main-container">
                        <SymptomsTabs/>
                        <SymptomsChoice/>
                    </div>
                    <div className='symptoms-but'>
                        <ConfirmButton content='Продолжить' onConfirm={() => {
                            handlerClick()
                        }}/>
                    </div>
                </div>
        }
    </React.Fragment>
}

export default observer(SymptomsPage);