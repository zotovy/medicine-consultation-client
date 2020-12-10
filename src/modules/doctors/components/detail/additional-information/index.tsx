import React from "react";
import controller from "../../../controllers/detail-controller";
import { observer } from "mobx-react";
import TileComponent from "./tile";

// Tab classes
const underlineClasses = ["first", "second", "third"];
const getTabClass = (i: number) => `tab ${controller.selectedTabIndex == i ? "selected" : ""}`;
const handleClick = (i: number) => controller.selectedTabIndex = i;
const getSelectedClass = () => `selected${controller.selectedTabIndex + 1}`;

const Index : React.FC = () => {



    return <section className="additional-information">
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
            </div>
            <div className="content_page content_page-2">
                <TileComponent
                    years="2005 - 2016"
                    title="ООО «Клиника классической медицины»"
                    subtitle="Невролог, мануальный терапевт"/>
            </div>
            <div className="content_page content_page-3">
                <TileComponent
                    years="2005 - 2016"
                    title="ООО «Клиника классической медицины»"
                    subtitle="Невролог, мануальный терапевт"/>
            </div>
        </div>
    </section>
}

export default observer(Index);