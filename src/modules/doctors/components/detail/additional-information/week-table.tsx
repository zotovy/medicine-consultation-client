import React from "react";
import { observer } from "mobx-react";
import controller from "../../../controllers/detail-controller";
import formatServices from "../../../../../services/format-services";
import validateServices from "../../../../../services/validation-services";
import { ChevronRight } from "../../../icons";
import Title from "../../../../../components/title";
import { DoctorDetailHelper } from "../../../helper";

const handleArrowClick = () => controller.selectedWeekIndex == 0
    ? controller.selectedWeekIndex = 1
    : controller.selectedWeekIndex = 0
const getWeekClass = () => controller.selectedWeekIndex == 0 ? "" : "second-selected";

// =============== UI STATE ===============

// const getTimes = (date: Date): string[] => {
//     if (!controller.doctor) return [];
//     const allTime: {from: Time, to: Time}[] = [];
//     const availableTime: {from: Time, to: Time}[] = [];
//
//     // Add all possible consultation dates
//     let time1InMin = controller.doctor.workingTime.from.h * 60 + controller.doctor.workingTime.from.m;
//     const time2InMin = controller.doctor.workingTime.to.h * 60 + controller.doctor.workingTime.to.m;
//     while (time2InMin > time1InMin + controller.doctor.workingTime.consultationTimeInMin) {
//         const finishTimeInMin = time1InMin + controller.doctor.workingTime.consultationTimeInMin;
//         allTime.push({
//             from: {
//                 h: Math.floor(time1InMin / 60),
//                 m: time1InMin % 60,
//             },
//             to: {
//                 h: Math.floor(finishTimeInMin / 60),
//                 m: finishTimeInMin % 60,
//             }
//         });
//         time1InMin += controller.doctor.workingTime.consultationTimeInMin;
//     }
//
//     // Remove occupied time
//     allTime.forEach(e => {
//         if (!controller.doctor) return;
//         let isOccupied = false;
//         for (let i = 0; i < controller.doctor.schedule.length; i++) {
//             const item = controller.doctor.schedule[i];
//             if (!validateServices.theSameDay(item.from, date)) continue;
//             const from = e.from.h === item.from.getHours() && e.from.m === item.from.getMinutes();
//             const to = e.to.h === item.to.getHours() && e.to.m === item.to.getMinutes();
//             if (from || to) {
//                 isOccupied = true;
//                 break;
//             }
//         }
//
//         if (!isOccupied) availableTime.push(e);
//     });
//     return availableTime.map(e => `${formatServices.formatCustomTime(e.from)} – ${formatServices.formatCustomTime(e.to)}`);
// }
//
// const getWeek = (fromDate: Date) : DayType[] => {
//     if (!controller.doctor) return [];
//     const days : DayType[] = [];
//
//     for (let i = 0; i < 7; i++) {
//         const date = new Date();
//         date.setDate(fromDate.getDate() + i);
//         const times = getTimes(date);
//
//         days.push({
//             day: formatServices.formatDayAndMonth(date.getDate(), date.getMonth() + 1),
//             dayOfTheWeek: formatServices.getDayOfTheWeek(date.getDay() == 0 ? 6 : date.getDay() - 1),
//             times,
//         });
//     }
//
//     return days;
// }

const WeekTableComponent : React.FC = () => {

    // ================= UI ===================
    return <div className="week-table">
        {/* ----- FIRST WEEK ----- */}
        <div className={`week ${getWeekClass()}`}>
            {
                controller.firstWeekSchedule.map(e => <div className="day">
                    <div className={`day-name ${e.today ? "today" : ""}`}>
                        <span className="date">{ e.day }</span>
                        <span className="week-day">{ e.dayOfTheWeek }</span>
                    </div>
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
                            : e.times.filter(elem => !elem.occupied).map(elem => <div className="time">{ elem.time }</div>)
                    }
                </div>)
            }
        </div>

        {/* ----- SECOND WEEK ----- */}
        <div className={`week week-2 ${getWeekClass()}`}>
            {
                controller.secondWeekSchedule.map(e => <div className="day">
                    <div className="day-name">
                        <span className="date">{ e.day }</span>
                        <span className="week-day">{ e.dayOfTheWeek }</span>
                    </div>
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
                            : e.times.filter(elem => !elem.occupied).map(elem => <div className="time">{ elem.time }</div>)
                    }
                </div>)
            }
        </div>

        <div className={`next ${getWeekClass()}`} onClick={handleArrowClick}><ChevronRight/></div>
    </div>
}



export default observer(WeekTableComponent);