import React, { useState } from "react";
import classnames from "classnames";

type Props = {
    isOpen?: boolean;
    minWidth?: string;
    maxWidth?: string;
    startedFromSun?: boolean;
    months?: string[];
    weekdays?: string[];
    onClose?: () => void;
    minYear?: number;
    maxYear?: number;
    confirmMessage?: string;
    clearMessage?: string;
    onSave?: (date: Date) => void;
};

type DateObj = {
    disable: boolean;
    weekday: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | string;
    date: Date;
}


const Calendar: React.FC<Props> = (props: Props) => {

    // Props
    const weekdays = props.weekdays ?? ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const startedFromSun = props.startedFromSun ?? false;
    const months = props.months ?? ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const isOpen = props.isOpen ?? true;
    const minYear = props.minYear ?? 1500;
    const maxYear = props.minYear ?? 3000;
    const confirmMessage = props.confirmMessage ?? "Выбрать";
    const clearMessage = props.clearMessage ?? "Очистить";
    const onSave = props.onSave ?? function () { };


    const getDates = (year: number, month: number): Array<DateObj> => {

        const dates: DateObj[] = [];

        const firstDay = new Date(year, month, 1);

        // Before
        const need = firstDay.getDay();
        const dayInLastMonth = new Date(year, month, 0).getDate();
        for (let i = dayInLastMonth - need + 1; i <= dayInLastMonth; i++) {
            const date = new Date(year, month - 1, i);
            const obj: DateObj = {
                date: date,
                disable: true,
                weekday: weekdays[date.getDay()],
            }
            dates.push(obj)
        }

        // This month
        const dayAmount = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= dayAmount; i++) {
            const date = new Date(year, month, i);
            const obj: DateObj = {
                date: date,
                disable: false,
                weekday: weekdays[date.getDay()],
            }
            dates.push(obj);
        }

        // After
        const lastDay = dates[dates.length - 1].date;
        if (lastDay.getDay() !== 6) {
            const need2 = 6 - lastDay.getDay();
            for (let i = 1; i <= need2; i++) {
                const date = new Date(year, month + 1, i);
                const obj: DateObj = {
                    date: date,
                    disable: true,
                    weekday: weekdays[date.getDay()],
                }
                dates.push(obj);
            }
        }



        return dates;
    }

    const compareDates = (date1: Date, date2: Date | null) => {
        if (!date2) return false;

        if (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()) {
            return true
        } else {
            return false
        }
    }

    const formatedSelectedDate = () => {
        let date = selectedDate;

        if (selectedDate.getFullYear() === 1000) {
            date = new Date();
        }

        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();

        if (day.length === 1) {
            day = "0" + day;
        }

        if (month.length === 1) {
            month = "0" + month;
        }


        return `${day} / ${month} / ${date.getFullYear()}`
    }

    const getDatesFromMon = (year: number, month: number): Array<DateObj> => {

        let newDates = getDates(year, month);
        const firstEnable = newDates.find(e => !e.disable);

        if (firstEnable?.date.getDay() !== 0) {
            newDates.shift();
        } else {
            const beforeDates = [];
            const need = 6;
            const dayInLastMonth = new Date(year, month, 0).getDate();
            for (let i = dayInLastMonth - need + 1; i <= dayInLastMonth; i++) {
                const date = new Date(year, month - 1, i);
                const obj: DateObj = {
                    date: date,
                    disable: true,
                    weekday: weekdays[date.getDay()],
                }
                beforeDates.push(obj);
            }
            newDates = beforeDates.concat(newDates);
        }




        const last = new Date(newDates[newDates.length - 1].date);
        let newLast;
        if (newDates[newDates.length - 1].disable) {
            newLast = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1);
        } else {
            newLast = new Date(last.getFullYear(), last.getMonth() + 1, last.getDate() + 1);
        }

        newDates.push({
            date: newLast,
            disable: true,
            weekday: weekdays[newLast.getDay()],
        });



        const firstNextDisabled = newDates.slice(7).findIndex(e => e.disable);
        if (firstNextDisabled + 14 === newDates.length) {
            newDates = newDates.slice(0, firstNextDisabled + 7);
        }



        return newDates;

    }

    const groupByWeek = (thisDates: Array<DateObj>): Array<Array<DateObj>> => {
        const countWeeks = Math.ceil(thisDates.length / 7);

        const weeks = [];

        for (let i = 0; i < countWeeks; i++) {
            weeks.push(thisDates.slice(i * 7, (i + 1) * 7))
        }


        return weeks;
    }

    const goMonthForward = () => {

        if (monthIndex + 1 === 12) {
            setYear(year + 1);
        }

        setMonthIndex((monthIndex + 1) % 12)
        const newDates = startedFromSun ? getDates(year, (monthIndex + 1) % 12) : getDatesFromMon(year, (monthIndex + 1) % 12);
        setWeeks(groupByWeek(newDates));
    }

    const goMonthBackward = () => {
        if (monthIndex === 0) {
            setYear(year - 1);
        }


        if (monthIndex === 0) {
            setMonthIndex(11)
        } else {
            setMonthIndex(monthIndex - 1)
        }
        const newDates = startedFromSun ? getDates(year, Math.abs(monthIndex - 1) % 12) : getDatesFromMon(year, (monthIndex - 1) % 12);
        setWeeks(groupByWeek(newDates));
    }

    const goYearForward = () => {
        if (year !== maxYear) {
            setYear(year + 1);

            const newDates = startedFromSun ? getDates(year + 1, monthIndex) : getDatesFromMon(year + 1, monthIndex);
            setWeeks(groupByWeek(newDates));
        }

    }

    const goYearBackward = () => {
        if (year !== minYear) {
            setYear(year - 1);

            const newDates = startedFromSun ? getDates(year - 1, monthIndex) : getDatesFromMon(year - 1, monthIndex);
            setWeeks(groupByWeek(newDates));
        }

    }

    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(new Date(1000, 11, 21));
    const [dates] = useState(startedFromSun ? getDates(year, monthIndex) : getDatesFromMon(year, monthIndex));
    const [weeks, setWeeks] = useState(groupByWeek(dates));

    const styles = {
        calendarContainer: {
            minWidth: props.minWidth,
            maxWidth: props.maxWidth,
        }
    }

    return <React.Fragment>
        <div className={classnames("calendar-container", !isOpen ? "calendar-container-disable" : "")} style={styles.calendarContainer}>
            <div className="upbar">
                <div className="date">
                    <p className="start">{formatedSelectedDate()}</p>
                </div>
                <div className="close">
                    <i className="fa fa-times" aria-hidden="true" onClick={props.onClose}></i>
                </div>
            </div>
            <div className="calendar">
                <div className="calendar-up-row">
                    <div className="left">
                        <i className="fa fa-angle-double-left year-back" aria-hidden="true" onClick={goYearBackward}></i>
                        <i className="fa fa-angle-left" aria-hidden="true" onClick={goMonthBackward}></i>
                    </div>
                    <span className="month">{months[monthIndex]}</span>
                    <div className="right">
                        <i className="fa fa-angle-right" aria-hidden="true" onClick={goMonthForward}></i>
                        <i className="fa fa-angle-double-right year-forward" aria-hidden="true" onClick={goYearForward}></i>
                    </div>
                </div>
                <div className="weekdays">
                    <span id="mon" className="weekday">Пн</span>
                    <span id="tue" className="weekday">Вт</span>
                    <span id="wed" className="weekday">Ср</span>
                    <span id="thr" className="weekday">Чт</span>
                    <span id="fri" className="weekday">Пт</span>
                    <span id="sat" className="weekday">Сб</span>
                    <span id="sun" className="weekday">Вс</span>
                </div>
                <div className="days">
                    {
                        weeks.map((week, i) => {
                            console.log(week);
                            return <div className="week" key={i}>
                                {
                                    week.map(day => {
                                        const classes = classnames(
                                            "day",
                                            day.disable ? "disable-day" : "",
                                            compareDates(day.date, new Date()) ? "today" : "",
                                            compareDates(day.date, selectedDate) ? "selected" : "",
                                        );
                                        return <span
                                            key={day.date.toString()}
                                            onClick={() => setSelectedDate(day.date)}
                                            className={classes}
                                            id={day.date.getDate().toString()}>
                                            {day.date.getDate()}
                                        </span>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                <div className="button-container">
                    <button className="clear" onClick={() => {
                        const today = new Date();
                        setMonthIndex(today.getMonth());
                        const newDates = startedFromSun ? getDates(today.getFullYear(), today.getMonth()) : getDatesFromMon(today.getFullYear(), today.getMonth());
                        setWeeks(groupByWeek(newDates));
                        setSelectedDate(new Date(1000, 11, 21));
                    }}>{clearMessage}</button>
                    <button className="confirm" onClick={() => onSave(selectedDate)}>{confirmMessage}</button>
                </div>
            </div>
        </div>

    </React.Fragment>

}

export default Calendar;
