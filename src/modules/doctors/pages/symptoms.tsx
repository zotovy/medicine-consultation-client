import React from "react";
import SymptomsWrap from '../components/symptoms-title';
import Title from "../components/symptoms-title";
import SymptomsTabs from '../components/symptoms-tabs'
import ConfirmButton from '../../../components/confirm-button';
const SymptomsPage: React.FC = () => {
    return (
        <>
            <div className="symptoms-wrapper">
                <Title />
                {<div className="symptoms-main-container">
                    <SymptomsTabs />
                </div> }
                <div className='symptoms-but'>
                    <ConfirmButton content='Продолжить' onConfirm={() => { console.log(1) }} />
                </div>
            </div>
        </>
    )
}

export default SymptomsPage;