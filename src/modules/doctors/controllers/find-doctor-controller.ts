import { observable, action } from "mobx";
import jsonp from "jsonp";

class FindDoctorController {
    @observable doctors: DoctorType[] = [];

    // Filters
    @observable isFilterOpen: boolean = true;
    @observable openedFilters: string[] = [];
    @observable specialities: string[] = [];
    @observable workExperience: string[] = [];
    @observable rating: number[] = [0, 1, 2, 3, 4, 5];
    @observable sexs: string[] = ["male", "female"];
    @observable age: number[] = [];
    @observable isSelectCityModalOpen: boolean = false;
    @observable selectedCities: string[] = [];
    @observable selectedCitiesModal: string[] = [];
    @observable queryCities: string[] = [];
    @observable workPlan: string[] = ["single", "multiple"];
    @observable child: string[] = ["child", "adult"];

    private fecthDoctors = (from: number = 0, amount: number = 50) => {};

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

    @action typeCity = (value: string): void => {
        jsonp(
            `https://kladr-api.ru/api.php?query=${value}&contentType=city&limit=11`,
            undefined,
            (err: any, data: any) => {
                if (!err) {
                    const cities = data.result.splice(1, 10);
                    this.queryCities = cities.map((e: any) => e.name);
                }
            }
        );
    };

    @action addCity = (i: number): void => {
        if (!this.selectedCitiesModal.includes(this.queryCities[i])) {
            this.selectedCitiesModal.push(this.queryCities[i]);
        }
    };

    @action removeCity = (i: number): void => {
        this.selectedCitiesModal.splice(i, 1);
    };

    @action onModalSubmit = (): void => {
        this.selectedCities = this.selectedCitiesModal;
        this.isSelectCityModalOpen = false;
    };

    @action clickOnWorkPlan = (value: string): void => {
        this.workPlan = this.addOrRemoveItem(this.workPlan, value);
    };
    @action clickOnChild = (value: string): void => {
        this.child = this.addOrRemoveItem(this.child, value);
    };

    @action clearFilter = (): void => {
        this.specialities = [];
        this.workExperience = [];
        this.rating = [];
        this.sexs = [];
        this.age = [];
        this.selectedCities = [];
        this.selectedCitiesModal = [];
        this.workPlan = [];
        this.child = [];
    };
}

export default new FindDoctorController();
