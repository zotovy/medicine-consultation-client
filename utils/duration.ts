class Duration implements IDuration {
    constructor(minutes: number) {
        this.minutes = minutes;
    }

    minutes: number;

    inHours = (): number => Math.floor(this.minutes / 60);
}

export interface IDuration {
    minutes: number;

    inHours: () => number;
}

export default Duration;
