import React from "react";
import Title from "../../../../components/title";
import Review from "./reviews/review"
import controller from "../../controllers/detail-controller";

const ReviewsComponent: React.FC = () => {
    return <div className="reviews-component">
        <Title title="Отзывы" />
        <div className="reviews">

            {
                controller.doctor?.clientsReviews.map((e, i) => {
                    return <Review key={`${i}-review`} fullName={`${e.patientId.name} ${e.patientId.surname}`} id={e.patientId._id} rating={e.point} text={e.content} photoUrl={e.patientId.photoUrl} />
                })
            }


        </div>
        <span className="load-more">Ещё отзывы</span>
    </div>
}

export default ReviewsComponent;