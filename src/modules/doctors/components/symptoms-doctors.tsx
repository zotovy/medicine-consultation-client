import React from "react";
import Title from "../../../components/title";
import Slider from "./symptoms-doctor-slider";

const SymptomsFindDoctor: React.FC = () => {
    return(
        <div className="symptoms-wrapper symptoms-wrapper--slider">
            <Title title="Мы нашли" mark="!"/>
            <h3 className="symptoms-subtitle">Думаем, один из этих докторов должен вам подойти.</h3>
            <Slider/>
        </div>
    )
}

export default SymptomsFindDoctor;