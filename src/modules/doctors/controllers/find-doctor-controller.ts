import { observable, action } from "mobx";
import kladrApi from "kladrapi-for-node";
import axios from "axios";

class FindDoctorController {
    Kladr: any;

    constructor() {
        // @ts-ignore
        this.Kladr = new kladrApi({
            token: "YksBbydBEY5y9G8daK4aEzhT5aTB8ZT4",
        });
    }

    // Filters
    @observable isFilterOpen: boolean = true;
    @observable openedFilters: string[] = ["Пол"];

    @observable specialities: string[] = [];
    @observable workExperience: string[] = [];
    @observable rating: number[] = [0, 1, 2, 3, 4, 5];
    @observable sexs: string[] = ["male", "female"];
    @observable age: number[] = [];
    @observable selectedCities: string[] = [];
    @observable queryCities: string[] = [];
    @observable workPlan: string[] = ["single", "multiple"];
    @observable child: string[] = ["child", "adult"];

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
        axios
            .get(
                `https://kladr-api.com/api.php?token=YksBbydBEY5y9G8daK4aEzhT5aTB8ZT4&query=${value}&contentType=city&limit=11`
            )
            .then((data) => {
                console.log(data.data);
                this.queryCities = data.data.result
                    .splice(1, 11)
                    .map((e: any) => e.name);
            });

        // let q = { query: value, contentType: "city" };
        // this.Kladr.getData(q, (err: any, result: any) => {
        //     console.log(err, result);
        //     this.queryCities = result.splice(1, 11).map((e: any) => e.name);
        // });
    };

    @action clickOnWorkPlan = (value: string): void => {
        this.workPlan = this.addOrRemoveItem(this.workPlan, value);
    };
    @action clickOnChild = (value: string): void => {
        this.child = this.addOrRemoveItem(this.child, value);
    };
}

export default new FindDoctorController();
