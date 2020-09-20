import React from "react";
// import Skeleton from 'react-loading-skeleton';
// import RatingComponent from "./rating";
// import { useHistory } from "react-router-dom";
// import detailController from "../controllers/detail-controller";
// import controller from "../controllers/find-doctor-controller";

type Props = {
    title: string;
    description?: string;
    active: boolean;
    id: string;
};

const Symptom: React.FC<Props> = (props: Props) => {

    // const img = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg" ?? props.imgUrl;
    // const history = useHistory();

    // const goToDoctorPage = (): void => {
    //     detailController.fetchDoctor(props.id);
    //     history.push(`/doctor/${props.id}`);
    // }

    // if (controller.isLoading) {
    //     return <div className="doctor">
    //         <Skeleton style={{ marginRight: "10px" }} width={100} height={100} />
    //         <div className="info">
    //             <Skeleton style={{ display: "block", marginBottom: "5px" }} width={175} height={16} />
    //             <Skeleton style={{ display: "block" }} width={100} height={14} />
    //             <div className="rating">
    //                 <RatingComponent amount={props.rating} />
    //             </div>
    //         </div>
    //     </div>
    // }

    return(
        <div className="option-symp">
            <span className="option-symp-name">{props.title}</span>
            <div className="container">
                <input type="checkbox" name={props.id + "-checkbox"} id={props.id + "-checkbox"} className="css-checkbox" onClick={(e) => {console.log(e)}}/>
                <label htmlFor={props.id+"-checkbox"} className="css-label">
                    <span className="fa fa-plus"></span>
                    <span className="fa fa-minus"></span>
                </label>
            </div>
        </div>
    )
}

export default Symptom;