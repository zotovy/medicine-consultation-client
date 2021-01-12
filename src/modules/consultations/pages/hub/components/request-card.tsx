import React from "react";
import "../styles.scss";
import { observer } from "mobx-react";
import controller from "../controllers/hub-controller"
import RequestCard from "./request-card"
type Props = {

};
const RequestsPage: React.FC<Props> = (props: Props) => {
    const img = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg";
    return(
        <>
            <div className="request-list-item">
                <div className="item-row-up">
                    <div className="item-profile-pic" style={{ backgroundImage: `url(${img})` }}></div>
                    <h3 className="item-name-surname">Иванов Иван</h3>
                    <h4 className="item-time-to">Через 2 дня</h4>
                </div>
                <div className="item-row-down">
                    <h4 className="card-consultation-data">12 декабря, 10:00 – 11:00</h4>
                </div>
                <div className="buts-container">
                    <div className="popup-сancel-but popup-buts" onClick={() => controller.closePopUp()}>Подтвердить</div>
                    <div className="popup-discard-but popup-buts">Отказаться</div>             
                </div>
            </div>
        </>
    )
}

export default observer(RequestsPage);