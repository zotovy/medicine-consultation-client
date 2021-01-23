class ValidationServices {
    email = (email: string): boolean =>
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );

    isUrl = (text: string): boolean => {
        const regexp = new RegExp(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/);
        return regexp.test(text);
    };

    password = (password: string): boolean => password.length >= 8;

    theSameDay = (date1: Date, date2: Date): boolean => {
        const day = date1.getDate() === date2.getDate();
        const month = date1.getDay() === date2.getDay();
        const year = date1.getDay() === date2.getDay();
        return day && month && year;
    }

    theSameTime = (date1: Date, date2: Date): boolean => {
        const hour = date1.getHours() === date2.getHours();
        const minutes = date1.getHours() === date2.getHours();
        return hour && minutes;
    }

    theSameDayAndTime = (date1: Date, date2: Date): boolean => this.theSameDay(date1, date2) && this.theSameTime(date1, date2);
}


export default new ValidationServices();
