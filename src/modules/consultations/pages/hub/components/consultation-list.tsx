import React, { useEffect } from "react";
import "../styles.scss";
import { observer } from "mobx-react";
import controller from "../controllers/hub-controller";
import MediaQuery from "react-responsive";

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
        let currentDate: any = new Date();
        let txt: string = "",
            t = date - currentDate,
            timeToHours =  Math.ceil((t / (1000 * 60 * 60)) % 24),
            timeToDays = Math.floor(t / (1000 * 60 * 60 * 24)),
            timeToMinutes = Math.floor((t / 1000 / 60) % 60);
        if (timeToDays == 1){
            if (timeToHours < 0) {
                timeToHours = -1 * timeToHours
            }
            timeToDays = 0
        } else if (timeToDays > 1){
            if (timeToHours < 0) {
                timeToHours = -1 * timeToHours
            }
            let timeTo = (timeToDays * 24) - timeToHours;
            if (timeTo >= 24){
                timeToDays = Math.floor(timeTo/24);
                timeToHours = timeTo%24;
            }else {
                timeToHours = timeTo%24;
            }
        }
        if (timeToDays == 0) {
            if (timeToHours < 0) {
                timeToHours = -1 * timeToHours
            }
            if (timeToHours == 1) {
                txt = `Через ${timeToHours} час`;
            } else if (timeToHours > 1 && timeToHours < 5) {
                txt = `Через ${timeToHours} часа`;
            } else if (timeToHours > 5) {
                txt = `Через ${timeToHours} часов`;
            }
        } else if (timeToDays > 0) {
            if (timeToHours < 0) {
                timeToHours = -1 * timeToHours
            }
            if (timeToHours == 1) {
                txt = `${timeToHours} час`;
            } else if (timeToHours > 1 && timeToHours < 5) {
                txt = `${timeToHours} часа`;
            } else if (timeToHours > 5) {
                txt = `${timeToHours} часов`;
            }
            if (timeToDays = 1) {
                txt = `Через ${timeToDays} день ${txt}`;
            } else if (timeToDays > 1 && timeToDays < 1) {
                txt = `Через ${timeToDays} дня ${txt}`;
            } else {
                txt = `Через ${timeToDays} дней ${txt}`;
            }
        }else if (timeToMinutes < 0 && timeToMinutes > -60 && timeToHours < 0 || timeToDays < 0){
            if (timeToMinutes == -1) {
                txt = `Осталось ${60-(-1*timeToMinutes)} минута`;
            } else if (timeToHours < -1 && timeToHours < -5) {
                txt = `Осталось ${60-(-1*timeToMinutes)} минуты`;
            } else if (timeToHours > -5) {
                txt = `Осталось ${60-(-1*timeToMinutes)} минут`;
            }
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
            <MediaQuery maxWidth={768}>
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
            </MediaQuery>
            <MediaQuery minWidth={769}>
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
            </MediaQuery>
        </>
    )
}

export default observer(ListItem);