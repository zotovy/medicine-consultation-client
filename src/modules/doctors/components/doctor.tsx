import React from "react";
import { FullStar, HalfStar } from "../icons";

type Props = {
    name: string;
    surname: string;
    speciality: string;
    age: string;
    imgUrl: string;
    rating: number;
};

const Doctor: React.FC<Props> = (props: Props) => {

    const img = "https://static.ngs.ru/news/99/preview/14bc5f1903d062713ea68eb4e6bedcd70b0dcac5_824.jpg";

    const full: number = Math.floor(props.rating);
    const half: boolean = props.rating - Math.floor(props.rating) >= 0.5;
    const inactive: number = half ? 4 - full : 5 - full;

    console.log(full, half, inactive);

    return <div className="doctor">
        <div className="image" style={{ backgroundImage: `url(${img})` }}></div>
        <div className="info">
            <h3>{props.name}&nbsp;{props.surname}</h3>
            <span>{props.speciality}, {props.age}</span>
            <div className="rating">

                {
                    Array.from(Array(full).keys()).map((e) => <FullStar fill="#30B9D6" />)
                }

                {
                    half ? <HalfStar /> : <React.Fragment />
                }

                {
                    Array.from(Array(inactive).keys()).map(() => <FullStar fill="rgba(0, 0, 0, 0.1)" />)
                }

            </div>
        </div>
    </div>
}

export default Doctor;