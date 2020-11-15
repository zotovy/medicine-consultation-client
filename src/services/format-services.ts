class FormatServices {
    formatBySchema = (schema: string, input: string) => {
        const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        // cut last element if user enter too much
        if (input.length > schema.length) {
            input = input.substring(0, schema.length);
        }

        for (let i = 0; i < input.length; i++) {
            const e = input[i];

            if (schema[i] === "*") {
                if (!nums.includes(parseInt(e))) {
                    // if user on i position enter NaN
                    // but number need to be entered
                    return input.substring(0, i);
                }
            } else if (schema[i] === " ") {
                if (input[i] !== " ") {
                    // if need " " on i => insert
                    input = input.substring(0, i) + " " + input.substring(i);
                }
            } else if (schema[i] === "-") {
                if (input[i] !== "-") {
                    // if need "-" on i => insert
                    input = input.substring(0, i) + "-" + input.substring(i);
                }
            } else if (schema[i] === "/") {
                if (input[i] !== "/") {
                    // if need "-" on i => insert
                    input = input.substring(0, i) + "/" + input.substring(i);
                }
            }
        }

        const length = input.length;
        if (input[length - 1] === " " || input[length - 1] === "-") {
            input = input.substring(0, length - 1);
        }

        return input;
    };

    formatNumericPhone = (numeric: number): string => {
        let number: string = String(numeric);
        number = number.substring(1);

        if (number.length !== 10) return "";

        let final = "";
        let last = 0;
        const schema = "+7 *** ***-**-**";
        for (let i = 0; i < schema.length; i++) {
            if (schema[i] === "*") {
                final += number[last];
                last += 1;
            } else {
                final += schema[i];
            }
        }

        return final;
    };

    formatPhone = (input: string): string => {
        let schema = "*** ***-**-**";

        // cut input country code
        // +7 932 332-73-50 --> 932 332-73-50
        input = input.substring(3);

        input = this.formatBySchema(schema, input);

        // 932 332-73-50 --> +7 932 332-73-50
        return "+7 " + input;
    };

    formatDate = (date: Date | undefined): string => {
        if (!date) return "";

        return `${date.getDate()} / ${
            date.getMonth() + 1
        } / ${date.getFullYear()}`;
    };

    formatSize = (bytes: number): string => {
        if (bytes >= 1e9) return Math.floor(bytes / 1e9) + " Гб";
        if (bytes >= 1000000) return Math.floor(bytes / 1000000) + " Мб";
        if (bytes >= 1000) return Math.floor(bytes / 1000) + " Кб";
        return Math.floor(bytes / 1000) + " Б";
    };

    formatCard = (input: string): string => {
        let schema = "**** **** **** ****";
        input = this.formatBySchema(schema, input);
        return input;
    };

    formatToUsualDate = (date: Date | undefined) : string => {
        if (!date) return "";

        const dDays = this._deltaDateInDay(date, new Date());
        if (dDays < 1) return "меньше суток назад";
        if (dDays < 1) return "день назад";

        let day = date.getDay().toString(), month = date.getMonth().toString();
        if (day.length === 1) day = "0" + day;
        if (month.length === 1) month = "0" + month;

        let str = `${day}.${month}`;
        if (new Date().getFullYear() !== date.getFullYear()) str += `.${date.getFullYear()}`;
        return str;
    }

    private _deltaDateInDay = (date1: Date, date2: Date) : number => {
        return Math.abs(date1.getTime() - date2.getTime() / (1000 * 3600 * 24));
    }

    toNumericPhone = (phone: string) : number => {
        phone = phone.split(" ").join("").split("-").join("").split("+").join().split(",").join("");
        return parseInt(phone);
    }

    toUsualDate = (date: string) : Date => {
        const parts = date.split("/");
        return new Date(parseInt(parts[2]), parseInt(parts[1]), parseInt(parts[0]));
    }
}

export default new FormatServices();
