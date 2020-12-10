import React from "react";
import controller from "../../../controllers/detail-controller";
import { observer } from "mobx-react";
import TileComponent from "./tile";
import ImageTile from "./image-tile";

// Tab classes
const underlineClasses = ["first", "second", "third"];
const getTabClass = (i: number) => `tab ${controller.selectedTabIndex == i ? "selected" : ""}`;
const handleClick = (i: number) => controller.selectedTabIndex = i;
const getSelectedClass = () => `selected${controller.selectedTabIndex + 1}`;
const getSectionHeight = () => {
    const max = Math.max(3, 1, 1);
    return 55 + Math.round(max / 2) * 100;
}

const AdditionalInformation : React.FC = () => {
    return <section className="additional-information" style={{ height: `${getSectionHeight()}px` }}>
        {/* ------- TABS ------- */}
        <div className="tabs-group">
            <div className="tabs">
                <div className={getTabClass(0)} onClick={() => handleClick(0)} >Опыт работы</div>
                <div className={getTabClass(1)} onClick={() => handleClick(1)}>Образование</div>
                <div className={getTabClass(2)} onClick={() => handleClick(2)}>Квалификация</div>
            </div>

            <div className={`underline ${underlineClasses[controller.selectedTabIndex]}`}/>
        </div>

        {/* ------- CONTENT ------- */}
        <div className={`content  ${getSelectedClass()}`}>
            <div className="content_page content_page-1">
                <TileComponent
                    years="2005 - 2016"
                    title="ООО «Клиника классической медицины»"
                    subtitle="Невролог, мануальный терапевт"/>
                <TileComponent
                    years="2016 - 2018"
                    title="ООО «Клиника Нейроортопедии»"
                    subtitle="Невролог, остеопат, мануальный терапевт"/>
                <TileComponent
                    years="с 2018"
                    title="ООО «Дискотерапия плюс»"
                    subtitle="Невролог, остеопат, мануальный терапевт"/>
            </div>
            <div className="content_page content_page-2">
                <TileComponent
                    years="1981"
                    title="Пермский государственный медицинский университет им. акад. Е.А. Вагнера (лечебное дело)"
                    subtitle="Базовое образование"/>
            </div>
            <div className="content_page content_page-3">
                <ImageTile
                    title="Диплом по специальности «Лечебное дело"
                    imageUrl="https://ortho-rus.ru/uploads/posts/2019-09/1569532135_1-e1512037094751.jpg" />
            </div>
        </div>
    </section>
}

export default observer(AdditionalInformation);