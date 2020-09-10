import React from "react";
import Title from "../../../../components/title";
import Review from "./reviews/review"
import controller from "../../controllers/detail-controller";

const ReviewsComponent: React.FC = () => {

    const url = "https://cnet3.cbsistatic.com/img/-qQkzFVyOPEoBRS7K5kKS0GFDvk=/940x0/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg";

    return <div className="reviews-component">
        <Title title="Отзывы" />
        <div className="reviews">

            {
                controller.doctor?.clientsReviews.map((e, i) => {
                    return <Review fullName={`${e.patientId.name} ${e.patientId.surname}`} id={e.patientId._id} rating={e.point} text={e.content} photoUrl={e.patientId.photoUrl} />
                })
            }


        </div>
        <span className="load-more">Ещё отзывы</span>
    </div>
}

export default ReviewsComponent;