import React from "react";
import DetailController from "../../../controllers/detail-controller";
import { observer } from "mobx-react";
import TileComponent from "./tile";
import ImageTile from "./image-tile";
import { DoctorDetailHelper } from "../../../helper";
import { TYPES, useInjection } from "../../../../../container";

// Tab classes
const underlineClasses = ["first", "second", "third"];
const getTabClass = (selectedTabIndex: number, i: number) => `tab ${selectedTabIndex == i ? "selected" : ""}`;
const getSelectedClass = (selectedTabIndex: number) => `selected${selectedTabIndex + 1}`;
const getSectionHeight = () => {
    const max = Math.max(3, 1, 1);
    return 55 + Math.round(max / 2) * 100;
}
const getContentPage = (i: number, hasData: boolean) => `content_page content_page-${i} ${!hasData ? "no-data" : ""}`;

const AdditionalInformation : React.FC = () => {
    const controller = useInjection<DetailController>(TYPES.detailDoctorController);
    
    // UI State
    const workPlaces = DoctorDetailHelper.getWorkPlaces(controller.doctor?.workPlaces);
    const education = DoctorDetailHelper.getEducation(controller.doctor?.education);
    const qualificationProofs = controller.doctor?.qualificationProofs ?? [];

    return <section className="additional-information" style={{ height: `${getSectionHeight()}px` }}>
        {/* ------- TABS ------- */}
        <div className="tabs-group">
            <div className="tabs">
                <div className={getTabClass(controller.selectedTabIndex, 0)} onClick={() => controller.selectedTabIndex = 0} >Опыт работы</div>
                <div className={getTabClass(controller.selectedTabIndex, 1)} onClick={() => controller.selectedTabIndex = 1}>Образование</div>
                <div className={getTabClass(controller.selectedTabIndex, 2)} onClick={() => controller.selectedTabIndex = 2}>Квалификация</div>
            </div>

            <div className={`underline ${underlineClasses[controller.selectedTabIndex]}`}/>
        </div>

        {/* ------- CONTENT ------- */}
        <div className={`content  ${getSelectedClass(controller.selectedTabIndex)}`}>
            <div className={getContentPage(1, workPlaces.length != 0)}>
                {
                    workPlaces.length != 0
                        ? workPlaces.map(e => <TileComponent key={`workplace-${e.title}`} {...e} />)
                        : <span className="no-data">У этого доктора нет опыта работы</span>
                }
            </div>
            <div className={getContentPage(2, education.length != 0)}>
                {
                    education.length != 0
                        ? education.map(e => <TileComponent key={`education-${e.title}`} {...e} />)
                        : <span className="no-data">У этого доктора не указано образование</span>
                }
            </div>
            <div className={getContentPage(3, qualificationProofs.length != 0)}>
                {
                    qualificationProofs.length != 0
                        ? qualificationProofs.map(e => <ImageTile key={`qualification-${e.name}`} title={e.name} imageUrl={e.imageUrl}/>)
                        : <span className="no-data">У этого доктора не подтверждены квалификации</span>
                }
            </div>
        </div>
    </section>
}

export default observer(AdditionalInformation);