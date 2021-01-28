import React from "react";
import Skeleton from 'react-loading-skeleton';
import RatingComponent from "./rating";
import DetailController from "../controllers/detail-controller";
import FindDoctorController from "../controllers/find-doctor-controller";
import formatServices from "../../../services/format-services";
import { TYPES, useInjection } from "../../../container";
import { useRouter } from "next/router";

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
    const detailController = useInjection<DetailController>(TYPES.detailDoctorController);
    const controller = useInjection<FindDoctorController>(TYPES.findDoctorController);

    const img = props.imgUrl && props.imgUrl.length != 0 ? props.imgUrl : "../../../static/images/user-placeholder.jpg";
    const history = useRouter();

    const goToDoctorPage = (): void => {
        detailController.fetchDoctor(props.id);
        history.push(`/doctor/${props.id}`);
    }

    if (controller.isLoading) {
        return <div className="doctor">
            <Skeleton style={{ marginRight: "10px" }} width={100} height={100} />
            <div className="info">
                <Skeleton style={{ display: "block", marginBottom: "5px" }} width={175} height={16} />
                <Skeleton style={{ display: "block" }} width={100} height={14} />
                <div className="rating">
                    <RatingComponent amount={props.rating} />
                </div>
            </div>
        </div>
    }

    return <div className="doctor" onClick={goToDoctorPage}>
        <div className="image" style={{ backgroundImage: `url(${img})` }}/>
        <div className="info">
            <h3>{props.name}&nbsp;{props.surname}</h3>

            {
                props.age || props.speciality
                    ? <span className="speciality-and-age">{ formatServices.getAgeAndSpeciality(props.age, props.speciality) }</span>
                    : <React.Fragment />
            }

            <div className="rating">
                <RatingComponent amount={props.rating} />
            </div>
        </div>
    </div>
}

export default Doctor;