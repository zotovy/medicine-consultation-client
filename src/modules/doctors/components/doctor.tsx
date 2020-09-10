import React from "react";
import RatingComponent from "./rating";
import { useHistory } from "react-router-dom";
import detailController from "../controllers/detail-controller";

type Props = {
    name: string;
    surname: string;
    speciality: string;
    age?: number;
    imgUrl: string;
    rating: number;
    id: string;
};

const Doctor: React.FC<Props> = (props: Props) => {

    const img = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg" ?? props.imgUrl;
    const history = useHistory();

    const goToDoctorPage = (): void => {
        detailController.fetchDoctor(props.id);
        history.push(`/doctor/${props.id}`);
    }

    return <div className="doctor" onClick={goToDoctorPage}>
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