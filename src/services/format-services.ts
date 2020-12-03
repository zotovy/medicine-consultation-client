
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

    formatToUsualDate = (date: Date | undefined): string => {
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

    private _deltaDateInDay = (date1: Date, date2: Date): number => {
        return Math.abs(date1.getTime() - date2.getTime() / (1000 * 3600 * 24));
    }

    toNumericPhone = (phone: string): number => {
        phone = phone.split(" ").join("").split("-").join("").split("+").join().split(",").join("");
        return parseInt(phone);
    }

    private getNumEnding = (num: number, ending: [string, string, string]): string => {
        const last2 = num % 100;
        if (last2 >= 11 && last2 <= 19) return ending[2];

        const last = num % 10;
        switch (last) {
            case (1):
                return ending[0];
            case (2):
            case (3):
            case (4):
                return ending[1];
            default:
                return ending[2]
        }

    }

    experience = (experience: number): string => {
        if (experience < 30) return "Меньше месяца";
        if (experience < 365) {
            const months = Math.floor(experience / 31);
            return `${months} ${this.getNumEnding(months, ["месяц", "месяца", "месяцев"])}`
        }

        const years = Math.floor(experience / 365);
        return `${years} ${this.getNumEnding(years, ["год", "года", "лет"])}`
    }

    age = (age: number): string => `${age} ${this.getNumEnding(age, ["год", "года", "лет"])}`;

    translateSpeciality = (speciality: string): string => {
        const specialities = {
            Pediatrician: "Педиатр",
            Therapist: "Терапевт",
            Dermatologist: "Дерматолог",
            Psychologist: "Психолог",
            Defectologis: "Дефектолог",
            Logopedist: "Логопед",
            Nutritionist: "Диетолог",
            Allergist: "Аллерголог",
            Ophthalmologist: "Офтальмолог",
            Neurologist: "Невролог",
            Gynecologis: "Гинеколог",
            Venereologist: "Венеролог",
            Andrologist: "Андролог",
            Cardiologist: "Кардиолог",
            Pulmonologist: "Пульмонолог",
            Otolaryngologist: "Отаринголог",
            Orthopedist: "Ортопед",
            Dentist: "Стоматолог",
            Gastroenterologist: "Гастроэнтеролог",
        };

        // @ts-ignore
        return specialities[speciality];
    }

    getAgeAndSpeciality = (age: number | null = null, speciality: string | null = null) => {

        let string = "";
        if (typeof speciality == "string" && speciality.length > 0) string += `${speciality}, `;
        if (age) string += `${this.age(age)}, `;

        if (string.length > 0) string = string.substring(0, string.length - 2);
        return string;
    }
}

export default new FormatServices();
