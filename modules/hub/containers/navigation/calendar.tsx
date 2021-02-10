import React, { useState } from "react";
import styled from "styled-components";

import { ChevronRight } from "@/static/icons";
import classnames from "classnames";

const Container = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 5px 20px 0 #0000000d;
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    
    .icon {
      display: flex;
      justify-content:center;
      align-items:center;
      cursor: pointer;
      
      svg {
        width: 15px;
        height: 15px;
      }
      
      &.back {
        transform: rotate(180deg);
      } 
    }
    
    span.month {
      color: #282828;
      font-size: 16px;
    }
  }
  
  .days {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 20px;
  }
  
  span.weekday {
    text-align: center;
    color: #282828;
    font-weight: 500;
    font-size: 16px; 
  }
  
  span.day {
    color: #565656;
    font-size: 16px; 
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content:center;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin: 0 auto;
    user-select: none;
    
    &:hover:not(.selected, .today, .disabled) {
        border: 0.75px solid #dbdbdb;
    }
    
    &.today {
      color: #30b9d6;
      border: 0.75px solid #30b9d6;
    }
    
    &.selected {
      background: #30b9d6;
      color: white;
    }
    
    &.disabled {
      color: #ccc;
    }
    
    &.active:not(.disabled, .today, .selected, &:hover) {
      position: relative;
      
      &::after {
        content: "";
        position: absolute;
        bottom: 1px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #30b9d6;
      }
    }
  }
`;

type Props = {
    onSelect: (date: Date) => void,
    dates: Date[],
};

type DateObj = {
    disable: boolean;
    weekday: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | string;
    date: Date;
}

const Calendar: React.FC<Props> = (props) => {
    // Props
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const startedFromSun = false;
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

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

        return date1.getFullYear() === date2.getFullYear()
                && date1.getMonth() === date2.getMonth()
                && date1.getDate() === date2.getDate();
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


    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(new Date(1000, 11, 21));
    const [dates] = useState(startedFromSun ? getDates(year, monthIndex) : getDatesFromMon(year, monthIndex));
    const [weeks, setWeeks] = useState(groupByWeek(dates));

    return <Container className="calendar_component">
        <div className="header">
            <div className="back icon" onClick={goMonthBackward}><ChevronRight/></div>
            <span className="month">{months[monthIndex]}</span>
            <div className="fwrd icon" onClick={goMonthForward}><ChevronRight/></div>
        </div>
        <div className="days">
            <span className="weekday">Пн</span>
            <span className="weekday">Вт</span>
            <span className="weekday">Ср</span>
            <span className="weekday">Чт</span>
            <span className="weekday">Пт</span>
            <span className="weekday">Сб</span>
            <span className="weekday">Вс</span>

            {
                weeks.map(week => {
                    return week.map(day => {
                        const classes = classnames(
                                "day",
                                day.disable ? "disabled" : "",
                                compareDates(day.date, new Date()) ? "today" : "",
                                compareDates(day.date, selectedDate) ? "selected" : "",
                                props.dates.findIndex(date => compareDates(date, day.date)) !== -1 ? "active" : ""
                        );

                        return <span
                                key={day.date.toString()}
                                onClick={() => {
                                    if (day.disable) return;
                                    setSelectedDate(day.date);
                                    props.onSelect(day.date);
                                }}
                                className={classes}
                                id={day.date.getDate().toString()}>
                            {day.date.getDate()}
                        </span>
                    });
                })
            }
        </div>
    </Container>
}

export default Calendar;
