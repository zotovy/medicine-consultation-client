import React from "react";
// import Skeleton from 'react-loading-skeleton';
// import detailController from "../controllers/detail-controller";
// import controller from "../controllers/find-doctor-controller";

type Props = {
    title?: string;
    active?: string;
    id?: string;
};

const Option: React.FC<Props> = (props: Props) => {

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
        <div className="option">
            <div className="info">
                <h3>Хай</h3>
            </div>
        </div>
    )

        
}

export default Option;