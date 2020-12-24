import React from "react";
import controller from "../../../controllers/detail-controller";
import { observer } from "mobx-react";
import TileComponent from "./tile";
import ImageTile from "./image-tile";
import { DoctorDetailHelper } from "../../../helper";
import Doctor from "../../doctor";

// Tab classes
const underlineClasses = ["first", "second", "third"];
const getTabClass = (i: number) => `tab ${controller.selectedTabIndex == i ? "selected" : ""}`;
const handleClick = (i: number) => controller.selectedTabIndex = i;
const getSelectedClass = () => `selected${controller.selectedTabIndex + 1}`;
const getSectionHeight = () => {
    const max = Math.max(3, 1, 1);
    return 55 + Math.round(max / 2) * 100;
}
const getContentPage = (i: number, hasData: boolean) => `content_page content_page-${i} ${!hasData ? "no-data" : ""}`;

const AdditionalInformation : React.FC = () => {
    // UI State
    const workPlaces = DoctorDetailHelper.getWorkPlaces(controller.doctor?.workPlaces);
    const education = DoctorDetailHelper.getEducation(controller.doctor?.education);
    const qualificationProofs = controller.doctor?.qualificationProofs ?? [];

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
            <div className={getContentPage(1, workPlaces.length != 0)}>
                {
                    workPlaces.length != 0
                        ? workPlaces.map(e => <TileComponent {...e} />)
                        : <span className="no-data">У этого доктора нет опыта работы</span>
                }
            </div>
            <div className={getContentPage(2, education.length != 0)}>
                {
                    education.length != 0
                        ? education.map(e => <TileComponent {...e} />)
                        : <span className="no-data">У этого доктора не указано образование</span>
                }
            </div>
            <div className={getContentPage(3, qualificationProofs.length != 0)}>
                {
                    qualificationProofs.length != 0
                        ? qualificationProofs.map(e => <ImageTile title={e.name} imageUrl={e.imageUrl}/>)
                        : <span className="no-data">У этого доктора не подтверждены квалификации</span>
                }
            </div>
        </div>
    </section>
}

export default observer(AdditionalInformation);