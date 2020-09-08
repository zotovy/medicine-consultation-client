import Duration from "./duration";

class Time implements ITime {
    constructor(hour: number, minute: number) {
        this.hour = hour > 24 || hour < 0 ? 0 : hour;
        this.minute = minute > 60 || minute < 0 ? 0 : minute;
    }

    hour: number;
    minute: number;

    getDate = (): Date => new Date(1, 0, 1, this.hour, this.minute);
    inMinutes = (): number => this.minute + this.hour * 60;
    duration = (time: Time): Duration =>
        new Duration(Math.abs(time.inMinutes() - this.minute));

    add = (minutes: number): Time => {
        const min: number = (minutes + this.minute) % 60;
        const hoursToMin: number = Math.floor((minutes + this.minute) / 60);
        return new Time(hoursToMin + this.hour, min);
    };

    biggerOrEqualThan = (time: Time) => this.inMinutes() >= time.inMinutes();

    format = (): string => {
        let minute = String(this.minute),
            hour = String(this.hour);

        if (minute.length === 1) minute = "0" + minute;
        if (hour.length === 1) hour = "0" + hour;

        return `${hour}:${minute}`;
    };
}

export interface ITime {
    hour: number;
    minute: number;

    getDate: () => Date;
    inMinutes: () => number;
    duration: (date: Time) => Duration;
    add: (minutes: number) => Time;
    format: () => string;
}

export default Time;
