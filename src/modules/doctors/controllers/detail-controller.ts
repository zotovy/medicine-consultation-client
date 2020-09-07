import { observable } from "mobx";

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

    // getUIDayMarker = (occupied: number[]): Day[] => {
    //     const time: string[] = ["9:00", ""];
    // };
}

type Day = {
    title: string;
    isOccupied?: boolean;
};

export default new DetailController();
