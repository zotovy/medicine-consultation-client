import React from "react";
import SliderController from "../../controllers/symptoms-slider-controller";
import { observer } from "mobx-react";
import RatingComponent from "../rating";
import { TYPES, useInjection } from "../../../../container";
type Props = {
    name: string;
    surname: string;
    speciality: string;
    imgUrl: string;
    rating: number;
    id: string;
};

const Slide: React.FC<Props> = (props: Props) => {
    const consroller = useInjection<SliderController>(TYPES.symptomsSliderController);
    const {highlightSlideId ,slideHandlerClick} = controller;
    const img = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg" ?? props.imgUrl;

    return <div className={`slider-slide ${props.id === highlightSlideId ? "active" : ""}`} onClick={() => slideHandlerClick(props.id)}>
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

export default observer(Slide);