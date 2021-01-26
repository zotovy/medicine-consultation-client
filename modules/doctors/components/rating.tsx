import React from "react";
import { FullStar, HalfStar } from "../icons";

type Props = {
    amount: number;
}

const RatingComponent: React.FC<Props> = ({ amount }) => {
    const full: number = Math.floor(amount);
    const half: boolean = amount - Math.floor(amount) >= 0.5;
    const inactive: number = half ? 4 - full : 5 - full;


    return <div className="rating">
        {
            Array.from(Array(full).keys()).map((_, i) => <FullStar key={`active-star-${i}`} className="active-star-icon" fill="#30B9D6" />)
        }
        {
            half ? <HalfStar /> : <React.Fragment />
        }
        {
            Array.from(Array(inactive).keys()).map((_, i) => <FullStar key={`disable-star-${i}`} className="disable-star-icon" fill="rgba(0, 0, 0, 0.1)" />)
        }
    </div>
}


export default RatingComponent;