import React from "react";
import Title from "../../../../components/title";
import Review from "./reviews/review"

const ReviewsComponent: React.FC = () => {

    const text = "Разнообразный и богатый опыт укрепление и развитие структуры представляет собой интересный эксперимент проверки фабрик  и прочих условий. Таким образом укрепление и развитие влечет за собой процесс внедрения и модернизации существенных финансовых и административных условий Разнообразный и богатый опыт реализация намеченных";
    const url = "https://cnet3.cbsistatic.com/img/-qQkzFVyOPEoBRS7K5kKS0GFDvk=/940x0/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg";

    return <div className="reviews-component">
        <Title title="Отзывы" />
        <div className="reviews">
            <Review fullName="Ярослав Зотов" id="123" rating={4} text={text} photoUrl={url} />
            <Review fullName="Ярослав Зотов" id="123" rating={4} text={text} photoUrl={url} />
            <Review fullName="Ярослав Зотов" id="123" rating={4} text={text} photoUrl={url} />
            <Review fullName="Ярослав Зотов" id="123" rating={4} text={text} photoUrl={url} />
        </div>
        <span className="load-more">Ещё отзывы</span>
    </div>
}

export default ReviewsComponent;