import React from "react";
import { observer } from "mobx-react";
import controller from "../../../controllers/detail-controller";
import { ChevronRight } from "../../../icons";

const handleArrowClick = () => controller.selectedWeekIndex == 0
    ? controller.selectedWeekIndex = 1
    : controller.selectedWeekIndex = 0
const getWeekClass = () => controller.selectedWeekIndex == 0 ? "" : "second-selected";

const WeekTableComponent : React.FC = () => {
    return <div className="week-table">
        {/* ----- FIRST WEEK ----- */}
        <div className={`week ${getWeekClass()}`}>
            {
                [1, 2, 3, 4, 5, 6, 7].map(() => {
                    return <div className="day">
                        <div className="day-name">
                            <span className="date">9 Декабря</span>
                            <span className="week-day">Среда</span>
                        </div>
                        <div className="time">9:00 - 10:00</div>
                        <div className="time">9:00 - 10:00</div>
                        <div className="time">9:00 - 10:00</div>
                        <div className="time">9:00 - 10:00</div>
                    </div>
                })
            }
        </div>

        {/* ----- SECOND WEEK ----- */}
        <div className={`week week-2 ${getWeekClass()}`}>
            {
                [1, 2, 3, 4, 5, 6, 7].map(() => {
                    return <div className="day">
                        <div className="day-name">
                            <span className="date">10 Декабря</span>
                            <span className="week-day">Четверг</span>
                        </div>
                        <div className="time">11:00 - 10:00</div>

                    </div>
                })
            }
        </div>

        <div className={`next ${getWeekClass()}`} onClick={handleArrowClick}><ChevronRight/></div>
    </div>
}

export default observer(WeekTableComponent);