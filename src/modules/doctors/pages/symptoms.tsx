import React from "react";
import SymptomsWrap from '../components/symptoms-title';
import Title from "../components/symptoms-title";
import SymptomsImage from '../components/symptoms-image'
const SymptomsPage: React.FC = () => {
    return (
        <>
            <div className="symptoms-wrapper">
                <Title />
                <div className="symptoms-main-container">
                    <SymptomsImage />
                </div>
            </div>
        </>
    )
}

export default SymptomsPage;