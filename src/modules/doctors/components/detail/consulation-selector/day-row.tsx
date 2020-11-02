import React from "react";
import controller from "../../../controllers/detail-controller";

type Props = {
    day: string;
    occupied: number[],
    isWeekend: boolean;
}

const DayRow: React.FC<Props> = (props: Props) => {

    if (props.isWeekend) return <React.Fragment/>

    return <div className="day-row" id={props.day}>
        <div className="day-name">{props.day}</div>
        <div className="times">
            {
                controller.getUIDayMarker([1, 2, 3, 4, 6, 7, 8]).map((e, i) => {
                    let className = "time x" + e.x;
                    if (e.isOccupied) className += " occupied ";

                    return <div className={className} key={`time-${i}`}>{e.title}</div>
                })
            }

        </div>
    </div >
}

export default DayRow;