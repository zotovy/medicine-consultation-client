import React from "react";
import { observer } from "mobx-react";

type ItemInfo = {
    imgUrl: string;
    patientName: string;
    dateFrom: string;
    dateTo: string;
    id: string;
}

const UserItem: React.FC<ItemInfo> = (props: ItemInfo) => {

    const img = props.imgUrl ?? "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg",
        date:any = new Date(`${props.dateFrom}`),
        dateTo = new Date(`${props.dateTo}`),
        dateFrom = new Date(`${props.dateFrom}`),
        months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

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
            <div className={`list-item`}>
                <div className="item-row-up">
                    <div className="item-profile-pic" style={{ backgroundImage: `url(${img})` }}/>
                    <h3 className="item-name-surname">{props.patientName}</h3>
                </div>
                <div className="item-row-down">
                   <h4 className="card-consultation-data">{date.getDate()}&nbsp;{months[+date.getMonth()]},&nbsp;{formatDate(`${dateFrom.getHours()}`,`${dateFrom.getMinutes()}`)} – {formatDate(`${dateTo.getHours()}`,`${dateTo.getMinutes()}`)}</h4> 
                </div>
            </div>
        </>
    )
}

export default observer(UserItem);
