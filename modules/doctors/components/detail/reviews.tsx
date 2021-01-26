import React from "react";
import Review from "@/components/review"
import DetailController from "../../controllers/detail-controller";
import { TYPES, useInjection } from "../../../../container";

const ReviewsComponent: React.FC = () => {
    const controller = useInjection<DetailController>(TYPES.detailDoctorController);
    return <div className="reviews-component">
        <h3 className="title">Отзывы</h3>
        {/* <Title title="Отзывы" /> */}
        <div className="reviews">
            {
                controller.doctor?.reviews?.map((e, i) => {
                    // @ts-ignore
                    return <Review key={`${i}-review`} fullName={`${e.patientId?.name} ${e.patientId.surname}`} id={e.patientId._id} rating={e.point} text={e.content} photoUrl={e.patientId.photoUrl} />
                })
            }
            <Review key={`$review`} fullName={`Ярослав Зотов`} rating={5} text={":)"} photoUrl={undefined} />
            <Review key={`$review`} fullName={`Ярослав Зотов`} rating={5} text={":)"} photoUrl={undefined} />
            <Review key={`$review`} fullName={`Ярослав Зотов`} rating={5} text={":)"} photoUrl={undefined} />
        </div>

        <span className="load-more">Ещё отзывы</span>
    </div>
}

export default ReviewsComponent;