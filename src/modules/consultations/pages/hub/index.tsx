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
import UserHub from "./user-hub"
import MediaQuery from "react-responsive";

const Hub: React.FC = () => {
    if(localStorage.getItem("uid") !== null){
        useEffect(() => {
            controller.getAppoints(`${localStorage.getItem('uid')}`);
            controller.getAppoinsRequest(`${localStorage.getItem('uid')}`);
        }, []);
    }
    let arrApp = toJS(controller.arrAppointments);
    const {showError, showLoader, consRequest, infoForCard, showCard, closeCard, itemPosActive,itemPosActive768, showPopUp, showRequestsPage } = controller;
    console.log(showCard)
    return(
        <>
        {localStorage.getItem("isUser") as string !== "true"
            ?
                <>
                    {localStorage.getItem("uid") !== null 
                        ?
                            <>
                                {!showError
                                    ?
                                        <>
                                                {showRequestsPage
                                                    ?
                                                    <RequestsPage />
                                                    :
                                                    <>
                                                        <MediaQuery minWidth={769}>
                                                            <div className="hub-wrapper">
                                                                <div className="hub-wrapper__patient-card left-side">
                                                                    {
                                                                    showCard
                                                                    ?
                                                                    <PatientСard patientName={infoForCard.patientName} number={infoForCard.phone}
                                                                        sex={infoForCard.sex} chronicDiseases={infoForCard.chronicDiseases ?? '' }
                                                                        symptoms={infoForCard.symptoms ?? '' } imgUrl={infoForCard.imgUrl ?? '' }
                                                                        dateTo={infoForCard.to} dateFrom={infoForCard.from}
                                                                        birthday={infoForCard.birthday} id={infoForCard._id}
                                                                        documents={infoForCard.documents} />
                                                                    :
                                                                    <></>
                                                                    }

                                                                </div>
                                                                <div className="hub-wrapper__sidebar right-side">
                                                                    <RequestIndicator numberRequest={consRequest.length ?? 0} />
                                                                    <div className="hub-calendar">
                                                                        <Calendar />
                                                                    </div>
                                                                    <div className="consultation-list-wrapper">
                                                                        <p className="list-section-title">Консультации</p>
                                                                        <div className="consultation-list">
                                                                            {
                                                                            !showLoader
                                                                            ? <>
                                                                                {arrApp.map((e:any, i: number) =>
                                                                                <ListItem key={e._id ?? ''} posActive={itemPosActive ?? ''}allInfo={e ?? ''}
                                                                                    arrPos={i ?? ''}imgUrl={e.imgUrl ?? '' } patientName={e.patientName ?? ''}
                                                                                    id={e._id ?? ''} dateTo={e.to ?? ''} dateFrom={e.from ?? ''} />)}
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <Loader />
                                                                            </>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </MediaQuery>
                                                        <MediaQuery maxWidth={768}>
                                                            <div className="hub-wrapper">
                                                                
                                                                    {
                                                                    showCard
                                                                    ?
                                                                        <div className="hub-wrapper__patient-card left-side">
                                                                            <div className="sub-wrap-card" onClick={()=>{closeCard()}}>
                                                                                <div className='patient-close-but'>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8.414" height="14.828" viewBox="0 0 8.414 14.828">
                                                                                        <path id="Icon_feather-chevron-left" data-name="Icon feather-chevron-left" d="M19.5,21l-6-6,6-6" transform="translate(-12.5 -7.586)" fill="none" stroke="#30b9d6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                                                                    </svg>
                                                                                </div>
                                                                                <p className="list-section-title">Консультация</p>
                                                                            </div>
                                                                            <PatientСard patientName={infoForCard.patientName} number={infoForCard.phone}
                                                                                sex={infoForCard.sex} chronicDiseases={infoForCard.chronicDiseases ?? '' }
                                                                                symptoms={infoForCard.symptoms ?? '' } imgUrl={infoForCard.imgUrl ?? '' }
                                                                                dateTo={infoForCard.to} dateFrom={infoForCard.from}
                                                                                birthday={infoForCard.birthday} id={infoForCard._id}
                                                                                documents={infoForCard.documents} />
                                                                        </div>
                                                                    :
                                                                    <>
                                                                        <div className="hub-wrapper__sidebar right-side">
                                                                            <RequestIndicator numberRequest={consRequest.length ?? 0} />
                                                                            <div className="hub-calendar">
                                                                                <Calendar />
                                                                            </div>
                                                                            <div className="consultation-list-wrapper">
                                                                                <p className="list-section-title">Консультации</p>
                                                                                <div className="consultation-list">
                                                                                    {
                                                                                    !showLoader
                                                                                    ? <>
                                                                                        {arrApp.map((e:any, i: number) =>
                                                                                        <ListItem key={e._id ?? ''} posActive={itemPosActive768 ?? ''}allInfo={e ?? ''}
                                                                                            arrPos={i ?? ''}imgUrl={e.imgUrl ?? '' } patientName={e.patientName ?? ''}
                                                                                            id={e._id ?? ''} dateTo={e.to ?? ''} dateFrom={e.from ?? ''} />)}
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <Loader />
                                                                                    </>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    }
                                                            </div>
                                                        </MediaQuery>
                                                        
                                                        {showPopUp ? <WarningPopUp/> : <></>} 
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
            :
                <> 
                    <UserHub/>
                </>
            }
        </>     
    )
} 

export default observer(Hub);