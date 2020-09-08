import { observable } from "mobx";
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
    }

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

            if (last && last.isOccupied && isOccupied && occupiedInARow <= 12) {
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
