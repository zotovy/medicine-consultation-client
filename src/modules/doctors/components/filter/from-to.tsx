import React from "react";
import controller from "../../controllers/find-doctor-controller";
import { observer } from "mobx-react";

interface availableKeys {
    rating: string;
}

type Props = {
    controllerKey: keyof availableKeys;
    type?: string;
    min?: number;
    max?: number;
    fromPlaceholder?: string;
    toPlaceholder?: string;
};


const FromToFilterItem: React.FC<Props> = (props) => {

    return <div className="from-to">
        <input
            placeholder={props.fromPlaceholder}
            value={controller[props.controllerKey][0]}
            type={props.type ?? "text"}
            id="from"
            onChange={(e) => controller[props.controllerKey][0] = parseInt(e.target.value)}
        />
        <div className="dash"></div>
        <input
            placeholder={props.toPlaceholder}
            value={controller[props.controllerKey][1]}
            type={props.type ?? "text"}
            id="to"
            onChange={(e) => controller[props.controllerKey][1] = parseInt(e.target.value)}
        />
    </div>
}

export default observer(FromToFilterItem);