import React from "react";
import "../styles.scss";
import Item from "./list-item";

type ItemInfo = {
    imgUrl: string;
    name: string;
    surname: string;
    date: string | any;
    dateFrom: string;
    dateTo: string;
    id: string;
}
const ListConsultations: React.FC<ItemInfo> = (props: ItemInfo) => {
    return(
        <>
            <div className="consultation-list-wrapper">
                <p className="list-section-title">Консультации</p>
                <div className="consultation-list">
                    <Item imgUrl={props.imgUrl} name={props.name} surname={props.surname} date={props.date} id={props.id} dateTo="" dateFrom=""/>
                    <Item imgUrl={props.imgUrl} name={props.name} surname={props.surname} date={props.date} id={props.id} dateTo="" dateFrom=""/>
                    <Item imgUrl={props.imgUrl} name={props.name} surname={props.surname} date={props.date} id={props.id} dateTo="" dateFrom=""/>
                    <Item imgUrl={props.imgUrl} name={props.name} surname={props.surname} date={props.date} id={props.id} dateTo="" dateFrom=""/>
                    <Item imgUrl={props.imgUrl} name={props.name} surname={props.surname} date={props.date} id={props.id} dateTo="" dateFrom=""/>
                    <Item imgUrl={props.imgUrl} name={props.name} surname={props.surname} date={props.date} id={props.id} dateTo="" dateFrom=""/>
                </div>
            </div>
        </>
    )
}

export default ListConsultations;