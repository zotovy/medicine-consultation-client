import React from "react";
import { observer } from "mobx-react";
import { Chevron } from "../icons";
import controller from "../controllers/find-doctor-controller";
import FilterItemBase from "./filter/item-base";
import Checkbox from "../../../components/checkbox";
import FromToFilterItem from "../components/filter/from-to";
import { ESpeciality, workExperience } from "../enums";
import RatingListItem from "./filter/rating-list-item";
import CheckboxBase from "../../../components/checkbox-base";


const Filter: React.FC = () => {
    return <div className={`filter ${controller.isFilterOpen ? "open" : ""}`}>
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
                id="rating"
                title="Рейтинг">
                <RatingListItem amount={0} />
                <RatingListItem amount={1} />
                <RatingListItem amount={2} />
                <RatingListItem amount={3} />
                <RatingListItem amount={4} />
                <RatingListItem amount={5} />
            </FilterItemBase>
            <FilterItemBase
                id="sex"
                title="Пол"
            >
                <Checkbox
                    checked={controller.sexs.includes('male')}
                    label="Мужской"
                    onChange={() => controller.clickOnSex("male")} />
                <Checkbox
                    checked={controller.sexs.includes('female')}
                    label="Женский"
                    onChange={() => controller.clickOnSex("female")} />
            </FilterItemBase>
            <FilterItemBase
                id="age"
                title="Возраст"
            >
                <FromToFilterItem controllerKey="age" fromPlaceholder="От" toPlaceholder="До" />
            </FilterItemBase>
            <FilterItemBase
                id="city"
                title="Город"
            >

            </FilterItemBase>
            <FilterItemBase
                id="work-plan"
                title="График работы"
            >
                <Checkbox
                    checked={controller.workPlan.includes('single')}
                    label="Основное место работы"
                    onChange={() => controller.clickOnWorkPlan("single")} />
                <Checkbox
                    checked={controller.workPlan.includes('multiple')}
                    label="Не единственное место работы"
                    onChange={() => controller.clickOnWorkPlan("multiple")} />
            </FilterItemBase>
            <FilterItemBase
                id="child"
                title="Детский"
            >
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
                id="service-experience"
                title="Стаж на сервисе"
            >
                {
                    workExperience.map(experience => <Checkbox
                        key={experience}
                        label={experience}
                        checked={controller.workExperience.includes(experience)}
                        onChange={() => controller.clickOnWorkExperienceFilter(experience)}
                    />)
                }
            </FilterItemBase>
        </div>

    </div>
}

export default observer(Filter);