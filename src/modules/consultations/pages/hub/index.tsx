import React from "react";
import "./styles.scss";
import Error from "./components/hub-error";
import PatientСard from "./components/patient-card"
import RequestIndicator from "./components/request-indicator"

const Hub: React.FC = () => {
    const showError: boolean = false;
    return(
        <>
            {
                !showError 
                    ? 
                        <>
                            <div className="hub-wrapper left-side">
                                <PatientСard/>
                                <div className="hub-wrapper__sidebar right-side">
                                    <RequestIndicator numberRequest={1} />

                                </div>
                            </div>

                        </>
                    : 
                        <Error/>
            }    
        </>     
    )
} 

export default Hub;