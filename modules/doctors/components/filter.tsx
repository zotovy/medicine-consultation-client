// This file includes search input & all existing filters =)
import React from "react";
import { observer } from "mobx-react";
import { CaretteDown, Chevron, SearchIcon } from "../icons";
import FilterItemBase from "./filter/item-base";
import { doctorSpecialities, workExperience } from "../enums";
import Checkbox from "@/components/checkbox";
import RatingListItem from "./filter/rating-list-item";
import FindDoctorController , { ESortBy } from "../controllers/find-doctor-controller";
import { useInjection, TYPES } from "../../../container";

const Filter: React.FC = () => {
    const controller = useInjection<FindDoctorController>(TYPES.findDoctorController);

    const otherFilters = <div className="desktop-filters">
        <FilterItemBase title="Специальность">
            {
                doctorSpecialities.map(speciality => <Checkbox
                    id={speciality}
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
    </div>

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
                    <div className="selector" onClick={() => controller.sortByFilterOpen = !controller.sortByFilterOpen}>
                        { controller.sortBy }
                        <CaretteDown />
                        <div className={`dropdown ${controller.sortByFilterOpen ? "" : "off"}`}>
                            <span
                                className="selection"
                                onClick={() => controller.clickOnSortBy(ESortBy.rating)} >
                                Рейтингу
                            </span>
                            <span
                                className="selection"
                                onClick={() => controller.clickOnSortBy(ESortBy.experience)} >
                                Опыту работы
                            </span>
                        </div>
                    </div>

                </div>

                <div onClick={controller.clickOnDownward} className={`downward-upward ${controller.isDownward ? "" : "upward"}`}>
                    <p className="stick" id="stick-top"/>
                    <p className="stick" id="stick-centre"/>
                    <p className="stick" id="stick-bottom"/>
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
            {otherFilters}

            </div>
        </div>
    </div>
}

export default observer(Filter);