import React from "react";
import Symptom from "./symptom";
import { observer } from "mobx-react";
import Loader from "../../../components/loading-indicator";
import controller from "../controllers/symptoms-controller";

console.log(Loader)

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
                               return <Symptom title={n.name} active={n.active} id={i} key={i}/>
                            }
                        }
                    )}
                </div>
                {props.find((n:any)  => n.active) !== undefined ? <hr/> : null}
                <div className={`disableOptions ${controller.loading ? "disLoading" : ''}`}>
                    {controller.loading
                        ? <Loader/> 
                        :   props.map((n:any, i:any) => {
                                if (n.active === false) {
                                    return <Symptom title={n.name} active={n.active} id={i} key={i}/>
                                }
                            })
                        
                    }
                
                </div>
            </div>
        )    
    }
    return <Option props={symptoms}/>
}

export default observer(OptionWp);