import React from "react";
import { toJS } from "mobx";
import Slider from "../components/symptoms/doctors";
import Title from "@/components/title";
import { observer } from "mobx-react";
import SymptomsTabs from '../components/symptoms/tabs'
import ConfirmButton from '@/components/confirm-button';
import SymptomsСhoice from '../components/symptoms/choice';
import ErrorBadge from '@/components/error-badge';
import SympController from "../controllers/symptoms-controller";
import { TYPES, useInjection } from "../../../container";
import { Redirect } from "react-router";


const SymptomsPage: React.FC = () => {
    const controller = useInjection<SympController>(TYPES.symptomsController);
    let { handlerClick, doctors } = controller,
        cloneDoctors = toJS(doctors);
    return (
        <>
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
                    ? cloneDoctors.length !== 0
                    ?
                    <Slider/>
                    :
                    <Redirect from="/" to="/symp-error"/>
                    : <div className="symptoms-wrapper">
                        <Title title="Симптомы" mark="."/>
                        <h3 className="symptoms-subtitle">Выберите симптомы, которые Вас беспокоят.<br/> Мы поможем
                            легко Вам подобрать нужного врача!</h3>
                        <div className="symptoms-main-container">
                            <SymptomsTabs/>
                            <SymptomsСhoice/>
                        </div>
                        <div className='symptoms-but'>
                            <ConfirmButton content='Продолжить' onConfirm={() => {
                                handlerClick()
                            }}/>
                        </div>
                    </div>
            }
        </>
    )
}

export default observer(SymptomsPage);