import React from "react";
import { observer } from "mobx-react";
import controller from "../controllers/symptoms-controller";

type Props = {
    title: string;
    description?: string;
    active: boolean;
    id: number;
};

const Symptom: React.FC<Props> = (props: Props) => {
    const {choiseSymp} = controller;
    return(
        <div className="option-symp">
            <span className="option-symp-name">{props.title}</span>
            <div className="container">
                <input key={props.id}type="checkbox" name={props.id + "-checkbox"} id={props.id + "-checkbox"} className="css-checkbox" onClick={(e) => choiseSymp(e)}/>
                <label htmlFor={props.id+"-checkbox"} className="css-label">
                    {
                        props.active == true ? <span className="fav fav-minus"></span> : <span className="fav fav-plus"></span>  
                    }
                </label>
            </div>
        </div>
    )
}

export default observer(Symptom);