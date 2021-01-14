import React from "react";
import "../styles.scss";
import { observer } from "mobx-react";
import controller from "../controllers/hub-controller"
import RequestCard from "./request-card"
type Props = {

};
const RequestsPage: React.FC<Props> = (props: Props) => {
    return(
        <>
            <div className="requests-page-wrapper">
                <h2 className="request-page-title">Заявки на консультацию</h2>
                <h4 className="request-page-hint">Пациенты оставили заявки на ваши консультации. Вы можете подтвердить их в течение 24 часов или сразу отказаться.</h4>
                <div className="container-requests-list">
                    <RequestCard/>
                </div>
                <div className="close-requests-page-but" onClick={() => controller.closeRequestsPage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.953" height="20.953" viewBox="0 0 20.953 20.953">
                        <path id="Icon_ionic-md-close" data-name="Icon ionic-md-close" d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z" transform="translate(-7.523 -7.523)" fill="#30b9d6"/>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default observer(RequestsPage);