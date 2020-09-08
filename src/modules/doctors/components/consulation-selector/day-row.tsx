import React from "react";

type Props = {
    day: string;
    occupied: number[],
    isWeekend: boolean;
}

const DayRow: React.FC<Props> = (props: Props) => {

    console.log(window.innerWidth);

    return <div className="day-row" id={props.day}>
        <div className="day-name">{props.day}</div>

        {
            props.isWeekend
                ? <div className="weekend">Выходной</div>
                : <div className="times">
                    <div className="time">9:00</div>
                    <div className="time occupied">10:00</div>
                    <div className="time occupied x12">11:00 - 12:00</div>
                    {/* <div className="time occupied x6">11:00</div>
                    <div className="time occupied">12:00</div> */}
                </div>
        }


    </div >
}

export default DayRow;