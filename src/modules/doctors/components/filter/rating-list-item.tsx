import React from "react";
import CheckboxBase from "../../../../components/checkbox-base";
import controller from "../../controllers/find-doctor-controller";
import { FullStar } from "../../icons";
import { observer } from "mobx-react";

type Props = {
    amount: number;
}

const RatingListItem: React.FC<Props> = ({ amount }) => {

    const full: number = Math.floor(amount);
    const inactive: number = 5 - Math.floor(amount);

    return <div className="rating-item">
        <CheckboxBase checked={controller.rating.includes(amount)} onChange={() => controller.clickOnRating(amount)} />
        {
            Array.from(Array(full).keys()).map(() => <FullStar fill="#30B9D6" />)
        }

        {
            Array.from(Array(inactive).keys()).map(() => <FullStar fill="rgba(0, 0, 0, 0.1)" />)
        }
        <span className="amount">{amount}</span>
    </div>
}

export default observer(RatingListItem);