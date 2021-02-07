import React from "react";
import { observer } from "mobx-react";

type ItemInfo = {
    imgUrl: string;
    name: string;
    surname: string;
    date: string | any;
    dateFrom: string;
    dateTo: string;
    id: string;
}

const Item: React.FC<ItemInfo> = (props: ItemInfo) => {
    const img = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg" ?? props.imgUrl,
            date:any = new Date(`${props.date}`),
            months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    function showTimeTo() {
        const currentDate = new Date();
        let txt: string = "",
            convertDateHours = date.getHours(),
            currentHours = currentDate.getHours(),
            timeToHours = convertDateHours - currentHours;
        if (+timeToHours <= 1) {
            txt = `Через ${timeToHours} час`;
        } else if (+timeToHours > 1 && +timeToHours < 5) {
            txt = `Через ${timeToHours} часа`;
        } else if (+timeToHours > 5) {
            txt = `Через ${timeToHours} часов`;
        }

        return txt;
    }
    return <>
            <div className="list-item">
                <div className="item-row-up">
                    <div className="item-profile-pic" style={{ backgroundImage: `url(${img})` }}></div>
                    <h3 className="item-name-surname">{props.name}&nbsp;{props.surname}</h3>
                    <h4 className="item-time-to">{showTimeTo()}</h4>
                </div>
                <div className="item-row-down">
                   <h4 className="card-consultation-data">{date.getDate()}&nbsp;{months[+date.getMonth()]},&nbsp;{date.getHours()}:{date.getMinutes()}</h4> 
                </div>
            </div>
    </>
}

export default observer(Item);
