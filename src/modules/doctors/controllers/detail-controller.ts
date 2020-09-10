import axios from "axios";
import { observable, action } from "mobx";
import settingDoctorController from "../../settings/controllers/doctor-controller";

class DetailController {
    constructor() {
        const now = new Date();
        this.fromDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - this.getWeekDay(now)
        );
        this.toDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + (7 - this.getWeekDay(now) - 1)
        );

        this.fetchDoctor("5f44c05f2c5c2939e09994a3");
    }

    @observable doctor: DoctorType | undefined;
    @observable loading: boolean = false;

    @action public fetchDoctor = (id: string): void => {
        this.loading = true;
        this._fetchDoctor(id).then((doctor) => {
            this.doctor = doctor;
            this.loading = false;
        });
    };

    private _fetchDoctor = async (
        id: string
    ): Promise<DoctorType | undefined> => {
        const response = await axios
            .get(process.env.REACT_APP_SERVER_URL + "/api/doctor/" + id)
            .then((data) => data.data)
            .catch((e) => e.response);

        if (!response?.success) {
            // todo: error handling
            return;
        }

        return await response.doctor;
    };

    formatExperience = (experience: number): string => {
        if (experience >= 365) return Math.floor(experience / 365) + "";
        if (experience >= 212) return "больше 6 месяцев";
        if (experience >= 182) return "6 месяцев";
        if (experience >= 120) return "больше 3 месяцев";
        if (experience >= 90) return "3 месяца";
        if (experience >= 60) return "2 месяца";
        if (experience >= 30) return "1 месяц";

        if (experience === 0) return "Отсутствует";

        const fEnding = [1, 21];
        const sEnding = [2, 3, 4, 22, 23, 24];
        if (fEnding.includes(experience)) return experience + " день";
        if (sEnding.includes(experience)) return experience + " дня";
        return experience + " дней";
    };

    declOfNum = (number: number, words: string[]) => {
        return words[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]
        ];
    };

    // Selector
    @observable fromDate: Date;
    @observable toDate: Date;

    private getWeekDay = (date: Date): number => {
        if (date.getDay() === 0) {
            return 6;
        }

        return date.getDay() - 1;
    };

    private getFormattedDate = (date: Date): string => {
        let day: string = date.getDate() + "",
            month: string = date.getMonth() + 1 + "";

        if (day.length === 1) {
            day = "0" + day;
        }

        if (month.length === 1) {
            month = "0" + month;
        }

        return `${day}.${month}`;
    };

    private addDays = (date: Date, amount: number): Date => {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + amount
        );
    };

    getFormattedFromDate = () => this.getFormattedDate(this.fromDate);
    getFormattedToDate = () => this.getFormattedDate(this.toDate);

    nextWeek = () => {
        this.fromDate = this.addDays(this.fromDate, 7);
        this.toDate = this.addDays(this.toDate, 7);
    };

    previousWeek = () => {
        this.fromDate = this.addDays(this.fromDate, -7);
        this.toDate = this.addDays(this.toDate, -7);
    };

    getUIDayMarker = (occupied: number[]): Time[] => {
        // build all consultation time
        const consultationTimeTitle: string[] = [];

        let now = settingDoctorController.startConsultationAt;
        const end = settingDoctorController.endConsultationAt;

        while (end.biggerOrEqualThan(now)) {
            consultationTimeTitle.push(now.format());
            now = now.add(settingDoctorController.consultationTime.minutes);
        }

        const consultationTime: Time[] = [];
        let last: Time;
        let occupiedInARow: number = 0;

        consultationTimeTitle.forEach((e, i) => {
            const isOccupied = occupied.includes(i);

            if (
                last &&
                last.isOccupied &&
                isOccupied &&
                occupiedInARow <= 12 &&
                window.screen.width > 425
            ) {
                occupiedInARow += 1;
                last = {
                    title: last.title.split(" - ")[0] + " - " + e,
                    isOccupied,
                    x: occupiedInARow,
                };
                consultationTime[consultationTime.length - 1] = last;
            } else {
                last = {
                    title: e,
                    isOccupied,
                    x: 0,
                };
                consultationTime.push(last);
                occupiedInARow = 0;
            }
        });

        return consultationTime;
    };
}

type Time = {
    title: string;
    isOccupied?: boolean;
    x: number;
};

export default new DetailController();
