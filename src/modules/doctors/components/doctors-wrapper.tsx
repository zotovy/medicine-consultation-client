import React from "react";
import Doctor from "./doctor";

const DoctorsWrapper: React.FC = () => {

    const a: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    return <div className="doctors-container">
        {
            a.map(() => <Doctor name="Иван" surname="Иванов" imgUrl="" rating={0.5} age="35 лет" speciality="Терапевт" />)
        }
    </div>
}

export default DoctorsWrapper;