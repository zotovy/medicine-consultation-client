import React, { lazy, Suspense } from "react";
import { observer } from "mobx-react";
import controller from "../controller/appoint-controller";

// Components
import Image from "../../auth/components/image";

// Static
import "../index.scss";
import image from "../../../static/images/signup-bg.png"
import MediaQuery from "react-responsive";

// Pages
import Page1 from "./appointment/page-1";
const Page2 = lazy(() => import("./appointment/page-2"));
const Page3 = lazy(() => import("./appointment/page-3"));

const AppointmentToConsultation: React.FC = () => {

    const translate = controller.pageIndex == 0 ? "" : controller.pageIndex == 1 ? "minus55" : "minus110";

    return <div className="appointment-module">
        <div className="wrapper">
            <MediaQuery minDeviceWidth="1025px">
                <Image image={image} />
            </MediaQuery>

            <div className="swapper">
                <Page1 className={translate} />
                <Suspense fallback={<React.Fragment />}>
                    <Page2 className={translate} />
                </Suspense>
                <Suspense fallback={<React.Fragment />}>
                    <Page3 className={translate} />
                </Suspense>
            </div>
        </div>
    </div>
}

export default observer(AppointmentToConsultation);