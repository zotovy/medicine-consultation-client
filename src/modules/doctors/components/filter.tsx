import React from "react";
import { observer } from "mobx-react";
import { Chevron } from "../icons";
import controller from "../controllers/find-doctor-controller";
import FilterItemBase from "./filter/item-base";
import Checkbox from "../../../components/checkbox";
import { ESpeciality, workExperience } from "../enums";


const Filter: React.FC = () => {
    return <div className="filter">
        <div className="main">
            <h3>Фильтр</h3>
            <Chevron
                onClick={() => controller.isFilterOpen = !controller.isFilterOpen}
                open={controller.isFilterOpen}
            />
        </div>
        <div className={`collapsed ${controller.isFilterOpen ? "open" : ""}`}>
            <FilterItemBase
                id="speciality"
                title="Специальность">
                {
                    Object.keys(ESpeciality).map(speciality => <Checkbox
                        key={speciality}
                        label={speciality}
                        checked={controller.specialities.includes(speciality)}
                        onChange={() => controller.clickOnSpecialityFilter(speciality)}
                    />)
                }
            </FilterItemBase>
            <FilterItemBase
                id="work-exprerience"
                title="Стаж работы">
                {
                    workExperience.map(experience => <Checkbox
                        key={experience}
                        label={experience}
                        checked={controller.workExperience.includes(experience)}
                        onChange={() => controller.clickOnWorkExperienceFilter(experience)}
                    />)
                }

            </FilterItemBase>
            <FilterItemBase
                title={"3"}>
                <Checkbox
                    label="Терапевт"
                    checked={controller.specialities.includes("Терапевт")}
                    onChange={() => controller.clickOnSpecialityFilter("Терапевт")}
                />
            </FilterItemBase>
        </div>

    </div>
}

export default observer(Filter);