// This file includes search input & all existing filters =)
import React from "react";
import { observer } from "mobx-react";
import { SearchIcon, CaretteDown, Chevron } from "../icons";
import FilterItemBase from "./filter/item-base";
import { ESpeciality, workExperience } from "../enums";
import Checkbox from "../../../components/checkbox";
import RatingListItem from "./filter/rating-list-item";
import controller from "../controllers/find-doctor-controller";
import MediaQuery from "react-responsive";

const Filter: React.FC = () => {


    const otherFilters = <React.Fragment>
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
            id="qualification"
            title="Квалификация"
        >
            <Checkbox
                checked={controller.qualification.includes('second')}
                label="Вторая"
                onChange={() => controller.clickOnQualification("second")} />
            <Checkbox
                checked={controller.qualification.includes('first')}
                label="Первая"
                onChange={() => controller.clickOnQualification("first")} />
            <Checkbox
                checked={controller.qualification.includes('highest')}
                label="Высшая"
                onChange={() => controller.clickOnQualification("highest")} />
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
    </React.Fragment>

    return <div className="filter">
        <div className="column">
            {/* Search input, sort by & downward */}
            <div className="row">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Введите имя доктора"
                        onChange={(e) => controller.onNameChange(e.target.value)}
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
                {/* <div className="mobile-collapsed">
                    <input type="checkbox" id="mobile-collapsed-input" />
                    <span>Фильтры</span>
                    <Chevron
                        fill="#727272"
                        open={false}
                    />
                </div> */}
                <MediaQuery maxWidth="1025px">
                    <div id="mobile-filters" className={`item ${controller.mobileFiltersOpen ? "open" : ""}`}>
                        <div className="title" onClick={() => controller.mobileFiltersOpen = !controller.mobileFiltersOpen}>
                            <h5>Фильтры</h5>
                            <Chevron
                                fill="#727272"
                                open={controller.mobileFiltersOpen}
                            />
                        </div>
                        <div className={`collapsed ${controller.mobileFiltersOpen ? "active" : ""}`}>
                            {otherFilters}
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery minWidth="1025px">
                    {otherFilters}
                </MediaQuery>

            </div>
        </div>
    </div>
}

export default observer(Filter);