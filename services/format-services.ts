export default class FormatServices {
    static formatBySchema = (schema: string, input: string) => {
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
            } else if (schema[i] === ":") {
                if (input[i] !== ":") {
                    // if need ":" on i => insert
                    input = input.substring(0, i) + ":" + input.substring(i);
                }
            }
        }

        const length = input.length;
        if (input[length - 1] === " " || input[length - 1] === "-") {
            input = input.substring(0, length - 1);
        }

        return input;
    };

    static formatNumericPhone = (numeric: number): string => {
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

    static formatPhone = (input: string): string => {
        let schema = "*** ***-**-**";

        // cut input country code
        // +7 932 332-73-50 --> 932 332-73-50
        input = input.substring(3);

        input = FormatServices.formatBySchema(schema, input);

        // 932 332-73-50 --> +7 932 332-73-50
        return "+7 " + input;
    };

    static formatTimeInput = (input: string): string => {
        let schema = "**:**"
        input = FormatServices.formatBySchema(schema, input);
        return input;
    }

    static formatDate = (date: Date | undefined): string => {
        if (!date) return "";
        let day = date.getDay().toString(), month = (date.getMonth() + 1).toString();
        if (day.length === 1) day = "0" + day;
        if (month.length === 1) month = "0" + month;

        return `${day} / ${month} / ${date.getFullYear()}`;
    };

    static formatSize = (bytes: number): string => {
        if (bytes >= 1e9) return Math.floor(bytes / 1e9) + " Гб";
        if (bytes >= 1000000) return Math.floor(bytes / 1000000) + " Мб";
        if (bytes >= 1000) return Math.floor(bytes / 1000) + " Кб";
        return Math.floor(bytes / 1000) + " Б";
    };

    static formatCard = (input: string): string => {
        let schema = "**** **** **** ****";
        input = FormatServices.formatBySchema(schema, input);
        return input;
    };

    static formatToUsualDate = (date: Date | undefined, needTime = false, useMonthName = false): string => {
        if (!date) return "";

        if (needTime) {
            const dMinutes = FormatServices._deltaDateInMinutes(date, new Date());
            if (dMinutes < 1) return "Меньше минуты назад";
            if (dMinutes < 60) return `${dMinutes} ${FormatServices.getNumEnding(dMinutes, ["минуту", "минуты", "минут"])} назад`;
            if (dMinutes < 1440) return `${Math.floor(dMinutes / 60)} ${FormatServices.getNumEnding(Math.floor(dMinutes / 60), ["час", "часа", "часов"])} назад`;
        }

        const dDays = FormatServices._deltaDateInDay(date, new Date());
        if (dDays < 1) return "меньше суток назад";
        if (dDays < 1) return "день назад";

        let day = date.getDate().toString(), month = (date.getMonth() + 1).toString();
        if (day.length === 1) day = "0" + day;
        if (month.length === 1) month = "0" + month;


        let str = `${day}.${month}`;
        if (useMonthName) str = FormatServices.formatDayAndMonth(parseInt(day), parseInt(month));
        if (new Date().getFullYear() !== date.getFullYear()) str += `${useMonthName ? " " : "."}${date.getFullYear()} ${useMonthName ? "г." : ""}`;
        return str;
    }

    private static _deltaDateInDay = (date1: Date, date2: Date): number => {
        return Math.abs(date1.getTime() - date2.getTime() / (1000 * 3600 * 24));
    }

    private static _deltaDateInMinutes = (date1: Date, date2: Date): number => {
        return Math.floor(Math.abs(date1.getTime() - date2.getTime())/ 1000 / 60);
    }

    static toNumericPhone = (phone: string): number => {
        phone = phone.split(" ").join("").split("-").join("").split("+").join().split(",").join("");
        return parseInt(phone);
    }

    private static getNumEnding = (num: number, ending: [string, string, string]): string => {
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

    static experience = (experience: number): string => {
        if (experience < 30) return "Меньше месяца";
        if (experience < 365) {
            const months = Math.floor(experience / 31);
            return `${months} ${FormatServices.getNumEnding(months, ["месяц", "месяца", "месяцев"])}`
        }

        const years = Math.floor(experience / 365);
        return `${years} ${FormatServices.getNumEnding(years, ["год", "года", "лет"])}`
    }

    static age = (age: number): string => `${age} ${FormatServices.getNumEnding(age, ["год", "года", "лет"])}`;

    static translateSpeciality = (speciality: string): string => {
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

    static getAgeAndSpeciality = (age: number | null = null, speciality: string | null = null) => {

        let string = "";
        if (typeof speciality == "string" && speciality.length > 0) string += `${speciality}, `;
        if (age) string += `${FormatServices.age(age)}, `;

        if (string.length > 0) string = string.substring(0, string.length - 2);
        return string;
    }

    static formatDayAndMonth = (day: number, month: number) : string => {
        const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        return `${day} ${months[month - 1]}`;
    }

    static getDayOfTheWeek = (i: number) : string => {
        return ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"][i];
    }

    static formatCustomTime = (time: { h: number, m: number}): string => {
        let h = time.h.toString(), m = time.m.toString();
        if (h.length === 1) h = "0" + h;
        if (m.length === 1) m = "0" + m;
        return `${h}:${m}`;
    }

    static formatTime = (date: Date): string => {
        let h = date.getHours().toString(), m = date.getMinutes().toString();
        if (h.length === 1) h = "0" + h;
        if (m.length === 1) m = "0" + m;
        return `${h}:${m}`;
    }

}

