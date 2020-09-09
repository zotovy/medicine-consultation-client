import React from "react";
import { observer } from "mobx-react";
import { Chevron } from "../../icons";
import controller from "../../controllers/detail-controller";
import DayRow from "./consulation-selector/day-row";
import Title from "../../../../components/title";


const ConsultationSelector: React.FC = () => {
    return <div className="selector">
        <Title title="Консультация" />
        <div className="week-selector">
            <Chevron open={false} id="left" onClick={controller.previousWeek} />
            <span id="data">{controller.getFormattedFromDate()} - {controller.getFormattedToDate()}</span>
            <Chevron open={false} id="right" onClick={controller.nextWeek} />
        </div>
        <DayRow day="Пн" occupied={[1, 2, 3]} isWeekend={false} />
        <DayRow day="Вт" occupied={[1, 2, 3]} isWeekend={false} />
        <DayRow day="Ср" occupied={[1, 2, 3]} isWeekend={false} />
        <DayRow day="Чт" occupied={[1, 2, 3]} isWeekend={false} />
        <DayRow day="Пт" occupied={[1, 2, 3]} isWeekend={false} />
        <DayRow day="Сб" occupied={[1, 2, 3]} isWeekend={false} />
        <DayRow day="Вс" occupied={[1, 2, 3]} isWeekend={true} />
    </div>
}


export default observer(ConsultationSelector);