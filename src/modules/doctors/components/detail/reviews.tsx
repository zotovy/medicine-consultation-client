import React from "react";
import Review from "../../../../components/review"
import controller from "../../controllers/detail-controller";

const ReviewsComponent: React.FC = () => {
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