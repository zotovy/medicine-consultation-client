import React from "react";
import "./styles.scss";
import Error from "./components/hub-error";
import PatientСard from "./components/patient-card"
import RequestIndicator from "./components/request-indicator"
import Calendar from "./components/calendar"
import ConsultationList from "./components/consultation-list"
import { observer } from "mobx-react";
import controller from "./controllers/hub-controller";
import { toJS } from "mobx"; 
const Hub: React.FC = () => {
    let {showError, arrAppointments} = controller,
        arrApp =  toJS(arrAppointments);
        console.log(arrApp) 
    return( 
        <>
            {
                !showError 
                    ? 
                        <>
                            <div className="hub-wrapper">
                                <div className="hub-wrapper__patient-card left-side">
                                    <PatientСard    name={controller.name} 
                                                    surname="Иванов" 
                                                    number="+7 (932) 33-27-350" 
                                                    sex="Мужской" 
                                                    chronicDiseases="" 
                                                    symptoms="Всё оч плохо ноги нет. Я не знаю что мне делать. Мне кажется я скоро умру, если вы мне не поможете" 
                                                    imgUrl=""
                                                    middlename="Иванович"
                                                    date="2020-12-31T23:39:06.265Z"
                                                    age= {1}
                                                    fullname="Василий Иванов Иванович"
                                                    id="AVCX21314DC"
                                    />
                                </div>
                                <div className="hub-wrapper__sidebar right-side">
                                    <RequestIndicator numberRequest={1} />
                                    <div className="hub-calendar">
                                        <Calendar/>
                                    </div>
                                    <ConsultationList imgUrl="" name="Василий" surname="Иванов" date="2020-12-31T23:39:06.265Z" id="AVCX21314DC" dateTo="" dateFrom=""/>
                                </div>
                            </div>

                        </>
                    : 
                        <Error/>
            }    
        </>     
    )
} 

export default observer(Hub);