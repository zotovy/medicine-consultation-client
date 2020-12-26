import React from "react";
import { observer } from "mobx-react";
import { Carousel } from 'react-responsive-carousel';
import controller from "../../../controllers/detail-controller";
import { ChevronRight } from "../../../icons";

import "react-responsive-carousel/lib/styles/carousel.min.css";


const handleArrowClick = () => controller.selectedWeekIndex == 0
    ? controller.selectedWeekIndex = 1
    : controller.selectedWeekIndex = 0
const getWeekClass = () => controller.selectedWeekIndex == 0 ? "" : "second-selected";

const WeekTableComponent : React.FC = () => {

    // ================= UI ===================
    return <div className="week-table">
        <Carousel>

        </Carousel>
    </div>
}

export default observer(WeekTableComponent);


type ControllerProps = (clickHandler: () => void, hasNext: boolean, label: string) => React.ReactNode;

const NextIcon: ControllerProps = (handler) => <div className="slider-controller slider-controller-next" onClick={handler}><ChevronRight/></div>
const PrevIcon: ControllerProps = (handler) => <div className="slider-controller slider-controller-prev" onClick={handler}><ChevronRight/></div>

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
                controller.schedule.map(e => <div className="day" key={e.day}>
                    <div className={`day-name ${e.today ? "today" : ""}`}>
                        <span className="date">{ e.day }</span>
                        <span className="week-day">{ e.dayOfTheWeek }</span>
                    </div>
                    <div className={`times ${e.isWeekEnd || e.times.filter(elem => !elem.occupied).length === 0 ? "no-grid" : ""}`}>
                        {
                            !e.isWeekEnd || <span className="text">Выходной</span>
                        }
                        {
                            e.times.filter(elem => !elem.occupied).length !== 0
                            || <span className="text">Нет свободной записи</span>
                        }
                        {
                            e.isWeekEnd
                                ? <React.Fragment/>
                                : e.times.filter(elem => !elem.occupied).map(elem => <div key={`${e.day}-${elem.time}`} className="time">{ elem.time }</div>)
                        }
                    </div>
                </div>)
            }
        </Carousel>
    </div>
});
