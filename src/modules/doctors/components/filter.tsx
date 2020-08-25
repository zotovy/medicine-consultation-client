// This file includes search input & all existing filters =)
import React, { useState } from "react";
import { observer } from "mobx-react";
import { SearchIcon, CaretteDown, CloseIcon } from "../icons";
import FilterItemBase from "./filter/item-base";
import { ESpeciality, workExperience } from "../enums";
import Checkbox from "../../../components/checkbox";
import RatingListItem from "./filter/rating-list-item";
import controller from "../controllers/find-doctor-controller";

const Filter: React.FC = () => {

    const [down, setDown] = useState(false)

    return <div className="filter">
        <div className="column">
            {/* Search input, sort by & downward */}
            <div className="row">
                <div className="search">
                    <input type="text" placeholder="Введите имя доктора" />
                    <SearchIcon />
                </div>

                <div className="sort-by">
                    <span id="sort-by__title">Сортироваться по</span>
                    <div className="selector">
                        Рейтингу
                        <CaretteDown />
                    </div>
                </div>

                <div onClick={() => setDown(!down)} className={`downward-upward ${down ? "" : "upward"}`}>
                    <p className="stick" id="stick-top"></p>
                    <p className="stick" id="stick-centre"></p>
                    <p className="stick" id="stick-bottom"></p>
                </div>
            </div>


            {/* Other filters */}
            <div className="other">
                <FilterItemBase title="Специальность">
                    {
                        Object.keys(ESpeciality).map(speciality => <Checkbox
                            key={speciality}
                            label={speciality}
                            checked={controller.specialities.includes(speciality)}
                            onChange={() => controller.clickOnSpecialityFilter(speciality)}
                        />)
                    }
                </FilterItemBase>
                <FilterItemBase title="Возраст пациента">
                    <Checkbox
                        checked={controller.workPlan.includes('child')}
                        label="Детский врач"
                        onChange={() => controller.clickOnWorkPlan("child")} />
                    <Checkbox
                        checked={controller.workPlan.includes('adult')}
                        label="Взрослый врач"
                        onChange={() => controller.clickOnWorkPlan("adult")} />
                </FilterItemBase>
                <FilterItemBase
                    id="experience"
                    title="Опыт работы">
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
                    id="work-plan"
                    title="Место работы"
                >
                    <Checkbox
                        checked={controller.workPlan.includes('single')}
                        label="Единственное"
                        onChange={() => controller.clickOnWorkPlan("single")} />
                    <Checkbox
                        checked={controller.workPlan.includes('multiple')}
                        label="Не единственное"
                        onChange={() => controller.clickOnWorkPlan("multiple")} />
                </FilterItemBase>
                <div className={`item ${controller.activeFilters.includes("Город") ? "active" : ""}`}>
                    <div id={"city"} className="title" onClick={() => { controller.isSelectCityModalOpen = true; }}>
                        <h5>Город</h5>
                    </div>
                </div>

                <FilterItemBase
                    id="rating"
                    title="Рейтинг">
                    <RatingListItem amount={0} />
                    <RatingListItem amount={1} />
                    <RatingListItem amount={2} />
                    <RatingListItem amount={3} />
                    <RatingListItem amount={4} />
                    <RatingListItem amount={5} />
                </FilterItemBase>
            </div>
        </div>
    </div>
}

export default observer(Filter);