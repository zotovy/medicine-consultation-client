import React from "react";
import CheckboxBase from "../../../../components/checkbox-base";
import controller from "../../controllers/find-doctor-controller";
import { observer } from "mobx-react";
import RatingComponent from "../rating";

type Props = {
    amount: number;
}

const RatingListItem: React.FC<Props> = ({ amount }) => {
    return <div className="rating-item">
        <CheckboxBase checked={controller.rating.includes(amount)} onChange={() => controller.clickOnRating(amount)} />
        <RatingComponent amount={amount} />
        <span className="amount">{amount}</span>
    </div>
}

export default observer(RatingListItem);