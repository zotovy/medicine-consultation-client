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

    formatDate = (date: Date): string => {
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
}

export default new FormatServices();
