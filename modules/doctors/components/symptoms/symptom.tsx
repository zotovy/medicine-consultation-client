import React from "react";
import { observer } from "mobx-react";
import SympController from "../../controllers/symptoms-controller";
import { TYPES, useInjection } from "../../../../container";

type Props = {
    title: string;
    description?: string;
    active: boolean;
    id: number;
};

const Symptom: React.FC<Props> = (props: Props) => {
    const controller = useInjection<SympController>(TYPES.symptomsController)
    const { choiseSymp } = controller;
    return (
        <div className="option-symp">
            <span className="option-symp-name">{props.title}</span>
            <div className="container">
                <input key={props.id} type="checkbox" name={props.id + "-checkbox"} id={props.id + "-checkbox"}
                       className="css-checkbox" onClick={(e) => choiseSymp(e, props.id)}/>
                <label htmlFor={props.id + "-checkbox"} className="css-label">
                    {
                        props.active ? <span className="fav fav-minus"/> : <span className="fav fav-plus"/>
                    }
                </label>
            </div>
        </div>
    )
}

export default observer(Symptom);