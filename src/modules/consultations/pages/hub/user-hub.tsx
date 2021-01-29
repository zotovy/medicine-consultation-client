import React, {useEffect} from "react";
import "./styles.scss";
import Calendar from "./components/calendar"
import UserListItem from "./components/user-list-item"
import { observer } from "mobx-react";
import controller from "./controllers/hub-controller";
import Loader from "../../../../components/loading-indicator";
import { toJS } from "mobx";
import WarningPopUp from "./components/warning-popup"
import RequestListItem from "./components/user-request-list-item"
const Hub: React.FC = () => {
    if(localStorage.getItem("uid") !== null){
        useEffect(() => {
            controller.userGetAppoints(`${localStorage.getItem('uid')}`);
            controller.userGetRequestAppoints(`${localStorage.getItem('uid')}`);
        }, []);
    }
    let userArrAppointments = toJS(controller.userArrAppointments);
    const {showLoader, userArrRequestAppointments, showCard, itemPosActive, showPopUp} = controller;
    if(showPopUp){
    }else(
        window.onscroll = function(){
            return true;
        }
    )
    return(
        <>
            {!showLoader 
                ? 
                    <>
                        <div className={`hub-wrapper hub-wrapper--user ${showPopUp ? "hub-wrapper--user-remove-scroll" : ''}`}>
                            <h2 className="section-title">Консультации</h2>
                            <div className="container-consultation-list">
                                {userArrAppointments !== undefined ? <>{userArrAppointments.map((e:any, i: number) => <UserListItem key={e._id ?? ''} posActive={itemPosActive ?? ''}allInfo={e ?? ''} arrPos={i ?? ''}imgUrl={e.imgUrl ?? '' } patientName={e.patientName ?? ''} id={e._id ?? ''} dateTo={e.to ?? ''} dateFrom={e.from ?? ''} />)}</> : "У вас нет запланированных консультаций"}
                            </div>
                            <h2 className="request-page-title">Не подтвержденные консультации</h2>
                            <h4 className="section-subtitle">Эти консультации еще не подтвердил доктор. Мы уведомим вас если доктор откажется от нее.</h4>
                            <div className="container-consultation-ntc-list">
                                {userArrRequestAppointments !== undefined ? <>{userArrRequestAppointments.map((e:any, i: number) => <RequestListItem key={e._id ?? ''} imgUrl={e.imgUrl ?? '' } patientName={e.patientName ?? ''} id={e._id ?? ''} dateTo={e.to ?? ''} dateFrom={e.from ?? ''} />)}</> : "У вас нет неподтвержденные консультаций"}
                            </div>
                        </div>
                        {showPopUp ? <WarningPopUp/> : <></>} 
                    </>  
                :
                    <Loader/>
            }
            
        </>     
    )
} 

export default observer(Hub);