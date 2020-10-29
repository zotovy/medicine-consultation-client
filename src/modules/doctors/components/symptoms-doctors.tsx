import React from "react";
import Title from "../../../components/title";
import ConfirmButton from '../../../components/confirm-button';

const SymptomsFindDoctor: React.FC = () => {
    return(
        <div className="symptoms-wrapper">
            <Title title="Мы нашли" mark="!"/>
            <h3 className="symptoms-subtitle">Думаем, один из этих докторов должен вам подойти.</h3> 
        </div>
    )
}

export default SymptomsFindDoctor;