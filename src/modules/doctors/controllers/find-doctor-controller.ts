import { observable, action } from "mobx";
import jsonp from "jsonp";
import axios from "axios";

class FindDoctorController {
    @observable doctors: DoctorType[] = [];
    @observable isInfinyLoading: boolean = false;
    @observable currentPage = 0;
    @observable isErrorBadgeOpen: boolean = false;
    private amountDoctorsOnOnePage = 50;

    constructor() {
        this.fecthDoctors(0, 50, true).then((docs) => (this.doctors = docs));
    }

    // Filters
    @observable name: string = "";
    @observable isDownward: boolean = false;
    @observable openedFilter: string = "";
    @observable activeFilters: string[] = [];
    @observable specialities: string[] = [];
    @observable qualification: string[] = [];
    @observable workExperience: string[] = [];
    @observable rating: number[] = [];
    @observable isSelectCityModalOpen: boolean = false;
    @observable selectedCities: string[] = [];
    @observable queryCities: string[] = [];
    @observable workPlan: string[] = [];
    @observable child: string[] = [];

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

    private getFilter = (from: number, amount: number): string => {
        let filter = "";

        const mapFilter = {
            from,
            amount,
            fullName: this.name,
            isDownward: this.isDownward,
            speciality: this.specialities,
            qualification: this.qualification,
            rating: this.rating,
            city: this.selectedCities,
            workPlan: this.workPlan,
        };

        Object.keys(mapFilter).forEach((key) => {
            // @ts-ignore
            const value = mapFilter[key];

            const defined = Array.isArray(value)
                ? value.length > 0
                : value
                ? true
                : false;

            if (defined) {
                filter += filter ? "&" : "?";
                filter += `${key}=${JSON.stringify(value)}`;
            }
        });

        //* Experience
        if (this.workExperience.length > 0) {
            const mapExperience = {
                "Меньше 1 года": "Less Year",
                "1 год": "OneYear",
                "3 года": "ThreeYears",
                "5 лет": "FiveYears",
                "Больше 5 лет": "MoreFiveYears",
            };

            const experience: string[] = [];
            this.workExperience.forEach((key) => {
                // @ts-ignore
                experience.push(mapExperience[key]);
                console.log(key);
            });

            filter += filter ? "&" : "?";
            filter += `experience=${JSON.stringify(experience)}`;
        }

        //* Child
        if (this.child.length !== 0) {
            filter += `&isChild=${this.child.includes("child")}`;
            filter += `&isAdult=${this.child.includes("adult")}`;
        }

        return filter;
    };

    private fecthDoctors = async (
        from: number = 0,
        amount: number = this.amountDoctorsOnOnePage,
        needFilter: boolean = false
    ): Promise<DoctorType[]> => {
        // todo
        const filter: string | undefined = needFilter
            ? this.getFilter(from, amount)
            : undefined;

        const data = await axios
            .get(process.env.REACT_APP_SERVER_URL + `/api/doctors${filter}`)
            .then((data) => data.data)
            .catch(() => {
                return {
                    success: false,
                };
            });

        if (!data.success) {
            this.openBadge();
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
        this.fecthDoctors(0, 50, true).then((docs) => (this.doctors = docs));
    };

    @action clickOnWorkExperienceFilter = (value: string): void => {
        this.workExperience = this.addOrRemoveItem(this.workExperience, value);
        this.fecthDoctors(0, 50, true).then((docs) => (this.doctors = docs));
    };

    @action clickOnRating = (value: number): void => {
        this.rating = this.addOrRemoveItem(this.rating, value);
        this.fecthDoctors(0, 50, true).then((docs) => (this.doctors = docs));
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
        this.fecthDoctors(0, 50, true).then((docs) => (this.doctors = docs));
    };

    @action clickOnWorkPlan = (value: string): void => {
        this.workPlan = this.addOrRemoveItem(this.workPlan, value);
        this.fecthDoctors(0, 50, true).then((docs) => (this.doctors = docs));
    };
    @action clickOnChild = (value: string): void => {
        this.child = this.addOrRemoveItem(this.child, value);
        this.fecthDoctors(0, 50, true).then((docs) => (this.doctors = docs));
    };

    @action clearFilter = (): void => {
        this.specialities = [];
        this.workExperience = [];
        this.rating = [];
        this.selectedCities = [];
        this.workPlan = [];
        this.child = [];
    };

    @action clickOnDownward = (): void => {
        this.isDownward = !this.isDownward;
        this.fecthDoctors(0, 50, true).then((docs) => (this.doctors = docs));
    };

    private openBadge = () => {
        this.isErrorBadgeOpen = true;
        setTimeout(() => {
            this.isErrorBadgeOpen = false;
        }, 5000);
    };
}

export default new FindDoctorController();
