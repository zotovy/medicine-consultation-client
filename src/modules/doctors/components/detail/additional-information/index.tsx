import React from "react";
import controller from "../../../controllers/detail-controller";
import { observer } from "mobx-react";

// Tab classes
const underlineClasses = ["first", "second", "third"];
const getTabClass = (i: number) => `tab ${controller.selectedTabIndex == i ? "selected" : ""}`;
const handleClick = (i: number) => controller.selectedTabIndex = i;

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


    </section>
}

export default observer(Index);