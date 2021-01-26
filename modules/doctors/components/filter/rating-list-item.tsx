import React from "react";
import CheckboxBase from "../../../../components/checkbox-base";
import FindDoctorController from "../../controllers/find-doctor-controller";
import { observer } from "mobx-react";
import RatingComponent from "../rating";
import { TYPES, useInjection } from "../../../../container";

type Props = {
    amount: number;
}

const RatingListItem: React.FC<Props> = ({ amount }) => {
    const controller = useInjection<FindDoctorController>(TYPES.findDoctorController);
    return <div className="rating-item">
        <CheckboxBase checked={controller.rating.includes(amount)} onChange={() => controller.clickOnRating(amount)} />
        <RatingComponent amount={amount} />
        <span className="amount">{amount}</span>
    </div>
}

export default observer(RatingListItem);