import React from "react";
import Symptom from "./symptom";
import { observer } from "mobx-react";
import controller from "../controllers/symptoms-controller";

const OptionWp: React.FC= () => {
    type Props = {
        props: any;
    }

    const {symptoms} = controller;

    const Option:React.FC<Props> = ({props}:any) => {
        return(
            <div className="option">
                <div className="activeOptions">
                   {props.map((n:any, i:any) => {
                            if (n.active === true) {
                               return <Symptom title={n.title} active={n.active} id={i} key={i}/>
                            }
                        }
                    )}
                </div>
                <hr/>
                <div className="disableOptions">
                    {props.map((n:any, i:any) => {
                            if (n.active === false) {
                                return <Symptom title={n.title} active={n.active} id={i} key={i}/>
                            }
                        }
                    )}
                </div>
            </div>
        )    
    }
    return <Option props={symptoms}/>
}

export default observer(OptionWp);