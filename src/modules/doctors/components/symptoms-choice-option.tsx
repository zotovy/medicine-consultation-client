import React from "react";
import Symptom from "./symptom";
import { observer } from "mobx-react";
import controller from "../controllers/symptoms-controller";

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

    const {symptoms} = controller;
    return(
        <div className="option">
            <div className="activeOptions">
               {symptoms.map((n:any, i:any) => (
                    n.active === true ? <Symptom title={n.title} active={n.active} id={i} key={i}/> : null
                    )
                )}
            </div>
            <hr/>
            <div className="disableOptions">
                {symptoms.map((n:any, i:any) => (
                    n.active === true ? null : <Symptom title={n.title} active={n.active} id={i} key={i}/>
                    )
                )}
            </div>
        </div>
    )

        
}

export default Option;