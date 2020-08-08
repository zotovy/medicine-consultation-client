import { observable, action } from "mobx";

class FindDoctorController {
    // Filters
    @observable isFilterOpen: boolean = true;
    @observable openedFilters: string[] = ["Пол"];

    @observable specialities: string[] = [];
    @observable workExperience: string[] = [];
    @observable rating: number[] = [0, 1, 2, 3, 4, 5];
    @observable sexs: string[] = ["male", "female"];
    @observable age: number[] = [];

    private addOrRemoveItem = (array: any[], value: any): Array<any> => {
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

    @action clickOnRating = (value: number): void => {
        this.rating = this.addOrRemoveItem(this.rating, value);
    };

    @action clickOnSex = (value: string): void => {
        this.sexs = this.addOrRemoveItem(this.sexs, value);
    };
}

export default new FindDoctorController();
