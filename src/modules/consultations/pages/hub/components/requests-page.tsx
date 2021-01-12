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
            </div>
        </>
    )
}

export default observer(RequestsPage);