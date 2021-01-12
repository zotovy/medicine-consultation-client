import React, {useEffect} from "react";
import "./styles.scss";
import Error from "./components/hub-error";
import PatientСard from "./components/patient-card"
import RequestIndicator from "./components/request-indicator"
import Calendar from "./components/calendar"
import ListItem from "./components/consultation-list"
import { observer } from "mobx-react";
import controller from "./controllers/hub-controller";
import Loader from "../../../../components/loading-indicator";
import { toJS } from "mobx";
import { Redirect } from "react-router-dom"; 
import WarningPopUp from "./components/warning-popup"
import RequestsPage from "./components/requests-page"

const Hub: React.FC = () => {
    if(localStorage.getItem("uid") !== null){
        useEffect(() => {
            controller.getAppoints(`${localStorage.getItem('uid')}`);
            controller.getAppoinsRequest(`${localStorage.getItem('uid')}`);
        }, []);
    }
    let arrApp = toJS(controller.arrAppointments);
    const {showError, showLoader, numberRequest, infoForCard, showCard, itemPosActive, showPopUp, showRequestsPage } = controller;
    return( 
        <>
            {localStorage.getItem("uid") !== null ?
                <>
                    {
                        !showError 
                            ? 
                                <>
                                    {showPopUp 
                                        ? 
                                            <WarningPopUp/> 
                                        : 
                                            <>
                                                {showRequestsPage 
                                                    ? 
                                                        <RequestsPage/> 
                                                    : 
                                                        <>
                                                            <div className="hub-wrapper">
                                                                <div className="hub-wrapper__patient-card left-side">
                                                                    {
                                                                        showCard
                                                                            ?
                                                                                <PatientСard    patientName={infoForCard.patientName} 
                                                                                    number={infoForCard.phone} 
                                                                                    sex={infoForCard.sex}
                                                                                    chronicDiseases={infoForCard.chronicDiseases ?? ''} 
                                                                                    symptoms={infoForCard.symptoms ?? ''} 
                                                                                    imgUrl={infoForCard.imgUrl ?? ''} 
                                                                                    dateTo={infoForCard.to} 
                                                                                    dateFrom={infoForCard.from} 
                                                                                    birthday= {infoForCard.birthday} 
                                                                                    id= {infoForCard._id}
                                                                                    documents={infoForCard.documents}
                                                                                />
                                                                            :
                                                                            <></>
                                                                    }
                                                                    
                                                                </div>
                                                                <div className="hub-wrapper__sidebar right-side">
                                                                    <RequestIndicator numberRequest={numberRequest}/>
                                                                    <div className="hub-calendar">
                                                                        <Calendar/>
                                                                    </div>
                                                                    <div className="consultation-list-wrapper">
                                                                        <p className="list-section-title">Консультации</p>
                                                                        <div className="consultation-list">
                                                                            {
                                                                                !showLoader
                                                                                ? <>
                                                                                    {arrApp.map((e:any, i: number) => <ListItem key={e._id} posActive={itemPosActive}allInfo={e} arrPos={i}imgUrl={e.imgUrl ?? ''} patientName={e.patientName} id={e._id} dateTo={e.to} dateFrom={e.from}/>)} 
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <Loader/>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                }
                                            </>
                                    }
                                </>
                            : 
                                <Error/>
                    }
                </>
                : 
                <Redirect to="/" from="/hub"/>
            }   
        </>     
    )
} 

export default observer(Hub);