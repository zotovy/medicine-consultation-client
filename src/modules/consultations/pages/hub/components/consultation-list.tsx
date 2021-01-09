import React, { useEffect } from "react";
import "../styles.scss";
import { observer } from "mobx-react";
import controller from "../controllers/hub-controller";

type ItemInfo = {
    imgUrl: string;
    patientName: string;
    dateFrom: string;
    dateTo: string;
    id: string;
    arrPos: number;
    allInfo: [];
    posActive: number;
}

const ListItem: React.FC<ItemInfo> = (props: ItemInfo) => {

    const img = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg" ?? props.imgUrl,
        date:any = new Date(`${props.dateFrom}`),
        dateTo = new Date(`${props.dateTo}`),
        dateFrom = new Date(`${props.dateFrom}`),
        months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

    function showTimeTo() {
        const currentDate = new Date();
        let txt: string = "",
            convertDateHours = date.getHours(),
            currentHours = currentDate.getHours(),
            timeToHours = (convertDateHours - currentHours);
        if(timeToHours < 0){
            timeToHours = -1*timeToHours
        }
        timeToHours = 24 - timeToHours;
        if (+timeToHours <= 1) {
            txt = `Через ${timeToHours} час`;
        } else if (+timeToHours > 1 && +timeToHours < 5) {
            txt = `Через ${timeToHours} часа`;
        } else if (+timeToHours > 5) {
            txt = `Через ${timeToHours} часов`;
        }
        return txt;
    }

    function formatDate (dateHours: string, dateMinutes: string){
        if (dateHours.length === 1) {
            dateHours = "0" + dateHours;
        }
        if (dateMinutes.length === 1 && +dateMinutes <= 6) {
            dateMinutes = "0" + dateMinutes;
        }
        return `${dateHours}:${dateMinutes}`
    }
    return(
        <>
            <div className={`list-item ${props.arrPos == props.posActive ? "active" : ""}`} onClick={()=>{controller.onItemHandlerClick(props.allInfo, props.arrPos)}}>
                <div className="item-row-up">
                    <div className="item-profile-pic" style={{ backgroundImage: `url(${img})` }}></div>
                    <h3 className="item-name-surname">{props.patientName}</h3>
                    <h4 className="item-time-to">{showTimeTo()}</h4>
                </div>
                <div className="item-row-down">
                   <h4 className="card-consultation-data">{date.getDate()}&nbsp;{months[+date.getMonth()]},&nbsp;{formatDate(`${dateFrom.getHours()}`,`${dateFrom.getMinutes()}`)} – {formatDate(`${dateTo.getHours()}`,`${dateTo.getMinutes()}`)}</h4> 
                </div>
            </div>
        </>
    )
}

export default observer(ListItem);