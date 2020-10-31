import React from "react";
import RatingComponent from "./rating";

type Props = {
    name: string;
    surname: string;
    speciality: string;
    imgUrl: string;
    rating: number;
    id: string;
    onClick: () => void;
};

const Slide: React.FC<Props> = (props: Props) => {
    const img = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg" ?? props.imgUrl;

    return <div className="slider-slide">
        <div className="doctor_profile_pic" style={{ backgroundImage: `url(${img})` }}></div>
        <div className="info">
            <h3 className="name-and-surname">{props.name}&nbsp;{props.surname}</h3>
            <h3 className="speciality">{props.speciality ? props.speciality : ""}</h3>

            <div className="rating">
                <RatingComponent amount={props.rating} />
            </div>
        </div>
    </div>
}

export default Slide;