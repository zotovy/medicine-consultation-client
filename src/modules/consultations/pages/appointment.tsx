import React from "react";
import { observer } from "mobx-react";
import controller from "../controller/appoint-controller";

// Pages
import Page1 from "./appointment/page-1";
import Page2 from "./appointment/page-2";

// Components
import Image from "../../auth/components/image";

// Static
import "../index.scss";
import image from "../../../static/images/signup-bg.png"
import MediaQuery from "react-responsive";

const AppointmentToConsultation: React.FC = () => {

    const translate = controller.pageIndex == 0 ? "" : controller.pageIndex == 1 ? "minus55" : "minus110";

    return <div className="appointment-module">
        <div className="wrapper">
            <MediaQuery minDeviceWidth="1025px">
                <Image image={image} />
            </MediaQuery>

            <div className="swapper">
                <Page1 className={translate} />
                <Page2 className={translate} />
            </div>
        </div>
    </div>
}

export default observer(AppointmentToConsultation);