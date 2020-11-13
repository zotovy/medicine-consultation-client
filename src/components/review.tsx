import React from "react";
import userPlaceholder from "../static/images/user-placeholder.jpg";
import Rating from "../modules/doctors/components/rating";
import "./styles/review.scss";

type Props = {
    photoUrl?: string;
    fullName: string;
    text: string;
    rating: number;
}

const Review: React.FC<Props> = (props: Props) => {
    let photoUrl = userPlaceholder;
    if (props.photoUrl && props.photoUrl.length > 0) {
        photoUrl = props.photoUrl;
    }

    const photoStyles = {
        backgroundImage: `url(${photoUrl})`,
    }

    return <div className="review-component">
        <div className="header">
            <div className="photo" style={photoStyles} />
            <div className="fullname">
                <span className="name">{props.fullName}</span>
                <div className="underline"></div>
            </div>
        </div>
        <p className="text">{props.text}</p>
        <Rating amount={props.rating} />
    </div>
}

export default Review;