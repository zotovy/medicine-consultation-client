import { observable, action } from "mobx";

class FindDoctorController {
    // Filters
    @observable isFilterOpen: boolean = true;
    @observable openedFilters: string[] = ["Стаж работы"];

    @observable specialities: string[] = [];
    @observable workExperience: string[] = [];
    @observable rating: number[] = [];

    private addOrRemoveItem = (array: any[], value: string): Array<any> => {
        const index = array.indexOf(value);
        if (index !== -1) {
            array.splice(index, 1);
        } else {
            array.push(value);
        }

        return array;
    };

    @action clickOnFilter = (value: string): void => {
        this.openedFilters = this.addOrRemoveItem(this.openedFilters, value);
    };

    @action clickOnSpecialityFilter = (value: string): void => {
        this.specialities = this.addOrRemoveItem(this.specialities, value);
    };

    @action clickOnWorkExperienceFilter = (value: string): void => {
        this.workExperience = this.addOrRemoveItem(this.workExperience, value);
    };
}

export default new FindDoctorController();
