import React from "react";
import { observer } from "mobx-react";
import { Chevron } from "../icons";
import controller from "../controllers/detail-controller";

const ConsultationSelector: React.FC = () => {
    return <div className="selector">
        <div className="week-selector">
            <Chevron open={false} id="left" onClick={controller.previousWeek} />
            <span id="data">{controller.getFormattedFromDate()} - {controller.getFormattedToDate()}</span>
            <Chevron open={false} id="right" onClick={controller.nextWeek} />
        </div>
    </div>
}


export default observer(ConsultationSelector);