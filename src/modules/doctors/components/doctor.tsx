import React from "react";
import { FullStar, HalfStar } from "../icons";

type Props = {
    name: string;
    surname: string;
    speciality: string;
    age?: number;
    imgUrl: string;
    rating: number;
};

const Doctor: React.FC<Props> = (props: Props) => {

    const img = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg" ?? props.imgUrl;

    const full: number = Math.floor(props.rating);
    const half: boolean = props.rating - Math.floor(props.rating) >= 0.5;
    const inactive: number = half ? 4 - full : 5 - full;

    return <div className="doctor">
        <div className="image" style={{ backgroundImage: `url(${img})` }}></div>
        <div className="info">
            <h3>{props.name}&nbsp;{props.surname}</h3>

            {
                //todo: bugfix -  21 лет
                props.age || props.speciality ? <span className="speciality-and-age">{props.speciality ? props.speciality + ", " : ""}{props.age ? props.age + " лет" : ""}</span> : <React.Fragment />
            }

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