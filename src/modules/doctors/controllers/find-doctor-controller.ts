import { observable, action } from "mobx";
import jsonp from "jsonp";
import axios from "axios";

class FindDoctorController {
    @observable doctors: DoctorType[] = [];
    @observable isInfinyLoading: boolean = false;
    @observable currentPage = 0;
    private amountDoctorsOnOnePage = 50;

    constructor() {
        this.fecthDoctors().then((docs) => (this.doctors = docs));
    }

    // Filters
    @observable isErrorBadgeOpen: boolean = false;
    @observable openedFilter: string = "";
    @observable activeFilters: string[] = [];
    @observable specialities: string[] = [];
    @observable workExperience: string[] = [];
    @observable rating: number[] = [0, 1, 2, 3, 4, 5];
    @observable sexs: string[] = ["male", "female"];
    @observable age: number[] = [];
    @observable isSelectCityModalOpen: boolean = false;
    @observable selectedCities: string[] = ["Москва", "Санкт-Петербург"];
    @observable queryCities: string[] = [];
    @observable workPlan: string[] = ["single", "multiple"];
    @observable child: string[] = ["child", "adult"];

    loadNextPage = async () => {
        if (this.isInfinyLoading) {
            return;
        }

        this.isInfinyLoading = true;

        // todo: filter

        const doctors = await this.fecthDoctors(
            this.currentPage * this.amountDoctorsOnOnePage
        );
        this.setDoctorAndOffLoading(doctors);
    };

    @action private setDoctorAndOffLoading = (doctors: DoctorType[]) => {
        this.doctors = this.doctors.concat(this.doctors, doctors);
        this.isInfinyLoading = false;
        this.currentPage += 1;
    };

    private fecthDoctors = async (
        from: number = 0,
        amount: number = this.amountDoctorsOnOnePage,
        needFilter: boolean = false
    ): Promise<DoctorType[]> => {
        // todo
        // const filters = needFilter ? {} : undefined;

        const data = await axios
            .get(
                process.env.REACT_APP_SERVER_URL +
                    `/api/doctors?from=${from}&amount=${amount}`,
                {
                    data: {
                        filter: {},
                    },
                }
            )
            .then((data) => data.data)
            .catch(() => {
                return {
                    success: false,
                };
            });

        if (!data.success) {
            this.openBadge();
        }

        for (let i = 0; i < 45; i++) {
            data.doctors.push(data.doctors[0]);
        }

        console.log(data.doctors[0]);

        return data.doctors ?? [];
    };

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
        this.openedFilter = value === this.openedFilter ? "" : value;
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
        if (!this.selectedCities.includes(this.queryCities[i])) {
            this.selectedCities.push(this.queryCities[i]);
        }
    };

    @action removeCity = (i: number): void => {
        this.selectedCities.splice(i, 1);
    };

    @action onModalSubmit = (): void => {
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
        this.workPlan = [];
        this.child = [];
    };

    private openBadge = () => {
        this.isErrorBadgeOpen = true;
        setTimeout(() => {
            this.isErrorBadgeOpen = false;
        }, 5000);
    };
}

export default new FindDoctorController();
