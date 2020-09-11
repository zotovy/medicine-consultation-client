import React from "react";

// Pages
import Page1 from "./appointment/page-1";

// Components
import Image from "../../auth/components/image";
import Title from "../../auth/components/title";

// Static
import "../index.scss";
import image from "../../../static/images/signup-bg.png"

const AppointmentToConsultation: React.FC = () => {
    return <div className="appointment-module">
        <div className="wrapper">
            <Image image={image} />

            <div className="swapper">
                <Page1 />
            </div>
        </div>
    </div>
}

export default AppointmentToConsultation;