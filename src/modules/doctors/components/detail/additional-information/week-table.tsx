import React from "react";
import { observer } from "mobx-react";
import { Carousel } from 'react-responsive-carousel';
import { useWindowWidth } from "@react-hook/window-size";
import controller from "../../../controllers/detail-controller";
import { ChevronRight } from "../../../icons";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DayType, DoctorDetailHelper } from "../../../helper";


const handleArrowClick = () => controller.selectedWeekIndex == 0
    ? controller.selectedWeekIndex = 1
    : controller.selectedWeekIndex = 0

type ControllerProps = (clickHandler: () => void, hasNext: boolean, label: string) => React.ReactNode;

const NextIcon: ControllerProps = (handler) => <div className="slider-controller slider-controller-next" onClick={handler}><ChevronRight/></div>
const PrevIcon: ControllerProps = (handler) => <div className="slider-controller slider-controller-prev" onClick={handler}><ChevronRight/></div>

const DayComponent: React.FC<{day: DayType}> = ({ day }) => {
    return <div className="day" key={day.day}>
        <div className={`day-name ${day.today ? "today" : ""}`}>
            <span className="date">{day.day }</span>
            <span className="week-day">{ day.dayOfTheWeek }</span>
        </div>
        <div className={`times ${day.isWeekEnd || day.times.filter(elem => !elem.occupied).length === 0 ? "no-grid" : ""}`}>
            {
                !day.isWeekEnd || <span className="text">Выходной</span>
            }
            {
                day.times.filter(elem => !elem.occupied).length !== 0
                || <span className="text">Нет свободной записи</span>
            }
            {
                day.isWeekEnd
                    ? <React.Fragment/>
                    : day.times.filter(elem => !elem.occupied).map(elem => <div key={`${day.day}-${elem.time}`} className="time">{ elem.time }</div>)
            }
        </div>
    </div>
}

const WeekTableComponent : React.FC = () => {

    const width = useWindowWidth();
    let amount = 1;

    if (width < 1043) amount = 4
    else if (width < 1250) amount = 5
    else if (width < 1400) amount = 6
    else amount = 7

    // ================= UI ===================
    return <div className="week-table">
        <Carousel
            renderArrowNext={NextIcon}
            renderArrowPrev={PrevIcon}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}>
            {
               DoctorDetailHelper.groupDays(controller.schedule, amount).map(group => <div className={`group ${group.length !== amount ? "no-sb" : ""}`}>
                   {
                       group.map(e => <DayComponent day={e}/>)
                   }
               </div>)
            }
        </Carousel>
    </div>
}

export default observer(WeekTableComponent);

export const WeekTableComponentMobile: React.FC = observer(() => {
    return <div className="week-table">
        <Carousel
            renderArrowNext={NextIcon}
            renderArrowPrev={PrevIcon}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            className="carousel">
            {
                controller.schedule.map(e => <DayComponent day={e}/>)
            }
        </Carousel>
    </div>
});
