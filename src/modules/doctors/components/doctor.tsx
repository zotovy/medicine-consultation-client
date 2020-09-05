import React from "react";
import RatingComponent from "./rating";
import { useHistory } from "react-router-dom";

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
    const history = useHistory();

    return <div className="doctor" onClick={() => history.push("/doctor/123")}>
        <div className="image" style={{ backgroundImage: `url(${img})` }}></div>
        <div className="info">
            <h3>{props.name}&nbsp;{props.surname}</h3>

            {
                //todo: bugfix -  21 лет
                props.age || props.speciality ? <span className="speciality-and-age">{props.speciality ? props.speciality + ", " : ""}{props.age ? props.age + " лет" : ""}</span> : <React.Fragment />
            }

            <div className="rating">
                <RatingComponent amount={props.rating} />
            </div>
        </div>
    </div>
}

export default Doctor;