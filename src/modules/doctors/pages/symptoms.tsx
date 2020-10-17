import React from "react";
import Title from "../components/symptoms-title";
import { observer } from "mobx-react";
import SymptomsTabs from '../components/symptoms-tabs'
import ConfirmButton from '../../../components/confirm-button';
import SymptomsСhoice from '../components/symptoms-choice';
import ErrorBadge from '../../../components/error-badge';
import controller from "../controllers/symptoms-controller";

const SymptomsPage: React.FC = () => {
    return (
        <>
            <ErrorBadge
                isOpen={controller.isErrorBadgeOpen}
                message="Произошла непридвиденная ошибка. Мы уже работаем над этим!"
            />
            <div className="symptoms-wrapper">
                <Title />
                {<div className="symptoms-main-container">
                    <SymptomsTabs />
                    <SymptomsСhoice />
                </div> }
                <div className='symptoms-but'>
                    <ConfirmButton content='Продолжить' onConfirm={() => { console.log(1) }} />
                </div>
            </div>
        </>
    )
}

export default observer(SymptomsPage);