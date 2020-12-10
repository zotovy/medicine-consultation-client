import React from "react";

const WeekTableComponent : React.FC = () => {
    return <div className="week-table">
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
}

export default WeekTableComponent;