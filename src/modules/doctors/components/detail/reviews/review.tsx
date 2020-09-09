import React from "react";
import userPlaceholder from "../../../../../static/images/user-placeholder.jpg";
import Rating from "../../rating";

type Props = {
    id: string;
    photoUrl?: string;
    fullName: string;
    text: string;
    rating: number;
}

const Review: React.FC<Props> = (props: Props) => {

    const photoUrl = props.photoUrl ?? userPlaceholder;
    const photoStyles = {
        backgroundImage: `url(${photoUrl})`,
    }

    return <div className="review">
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