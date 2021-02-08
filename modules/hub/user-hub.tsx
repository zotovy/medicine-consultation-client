import React, { useEffect } from "react";
import { NextPage } from "next";
// import { toJS } from "mobx";
import { observer } from "mobx-react";
import UserListItem from "./components/user-list-item"
import HubController from "./controllers/hub-controller";
import Loader from "@/components/loading-indicator";
import WarningPopUp from "./components/warning-popup"
import RequestListItem from "./components/user-request-list-item"
import { TYPES, useInjection } from "container";


const Hub: NextPage = () => {
    const controller = useInjection<HubController>(TYPES.hubController);

    if (typeof window !== "undefined" && localStorage.getItem("uid") !== null) {
        useEffect(() => {
            controller.userGetAppoints(`${localStorage.getItem('uid')}`);
            controller.userGetRequestAppoints(`${localStorage.getItem('uid')}`);
            controller.getAppointsDate(`${localStorage.getItem('uid')}`);
        }, []);
    }
    let userArrAppointments = controller.userArrAppointments;
    const { isLoading, userArrRequestAppointments, itemPosActive, showPopUp } = controller;

    // if (!showPopUp && typeof window !== "undefined") {
    //     window.onscroll = function () {
    //         return true;
    //     }
    // }
    return <React.Fragment>
        {
            !isLoading
                ? <React.Fragment>
                    <div
                        className={`hub-wrapper hub-wrapper--user ${showPopUp ? "hub-wrapper--user-remove-scroll" : ''}`}>
                        <h2 className="section-title">Консультации</h2>
                        <div className="container-consultation-list">
                            {
                                userArrAppointments !== undefined
                                    ? <>{userArrAppointments.map((e: any, i: number) =>
                                        <UserListItem key={e._id ?? ''} posActive={itemPosActive ?? ''} allInfo={e ?? ''}
                                                      arrPos={i ?? ''} imgUrl={e.imgUrl ?? ''} patientName={e.patientName ?? ''}
                                                      id={e._id ?? ''} dateTo={e.to ?? ''}
                                                      dateFrom={e.from ?? ''}/>)}</> : "У вас нет запланированных консультаций"}
                        </div>
                        <h2 className="request-page-title">Не подтвержденные консультации</h2>
                        <h4 className="section-subtitle">Эти консультации еще не подтвердил доктор. Мы уведомим вас если
                            доктор откажется от нее.</h4>
                        <div className="container-consultation-ntc-list">
                            {userArrRequestAppointments !== undefined ? <>{userArrRequestAppointments.map((e: any, i: number) =>
                                <RequestListItem key={e._id ?? ''} imgUrl={e.imgUrl ?? ''} patientName={e.patientName ?? ''}
                                                 id={e._id ?? ''} dateTo={e.to ?? ''}
                                                 dateFrom={e.from ?? ''}/>)}</> : "У вас нет неподтвержденные консультаций"}
                        </div>
                    </div>
                    {
                        showPopUp
                            ? <WarningPopUp/>
                            : <React.Fragment/>
                    }
                </React.Fragment>
                : <Loader/>
        }
    </React.Fragment>
}

export default observer(Hub);
