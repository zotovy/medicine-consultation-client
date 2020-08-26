// This file includes search input & all existing filters =)
import React from "react";
import { observer } from "mobx-react";
import { SearchIcon, CaretteDown } from "../icons";
import FilterItemBase from "./filter/item-base";
import { ESpeciality, workExperience } from "../enums";
import Checkbox from "../../../components/checkbox";
import RatingListItem from "./filter/rating-list-item";
import controller from "../controllers/find-doctor-controller";

const Filter: React.FC = () => {


    return <div className="filter">
        <div className="column">
            {/* Search input, sort by & downward */}
            <div className="row">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Введите имя доктора"
                        onChange={(e) => controller.name = e.target.value}
                        value={controller.name} />
                    <SearchIcon />
                </div>

                <div className="sort-by">
                    <span id="sort-by__title">Сортироваться по</span>
                    <div className="selector">
                        Рейтингу
                        <CaretteDown />
                    </div>
                </div>

                <div onClick={controller.clickOnDownward} className={`downward-upward ${controller.isDownward ? "" : "upward"}`}>
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
                        checked={controller.child.includes('child')}
                        label="Детский врач"
                        onChange={() => controller.clickOnChild("child")} />
                    <Checkbox
                        checked={controller.child.includes('adult')}
                        label="Взрослый врач"
                        onChange={() => controller.clickOnChild("adult")} />
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
                        checked={controller.workPlan.includes('Single')}
                        label="Единственное"
                        onChange={() => controller.clickOnWorkPlan("Single")} />
                    <Checkbox
                        checked={controller.workPlan.includes('Multiple')}
                        label="Не единственное"
                        onChange={() => controller.clickOnWorkPlan("Multiple")} />
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