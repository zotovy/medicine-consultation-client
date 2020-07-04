import { observable, action } from "mobx";

class SingupUIStore {
    //
    // Fields
    @observable name: string = "";
    @observable surname: string = "";
    @observable phone: string = "";
    @observable email: string = "";
    @observable password: string = "";
    @observable showPassword: boolean = false;
    @observable confirmPassword: string = "";
    @observable isMale: boolean = true;
    @observable agreeWithTerms: boolean = true;
    @observable needMailing: boolean = true;

    @observable nameError?: string;
    @observable surnameError?: string;
    @observable phoneError?: string;
    @observable emailError?: string;
    @observable passwordError?: string;
    @observable confirmPasswordError?: string;
    @observable errorMessage?: string;
    @observable showErrorMessage: boolean = false;

    // Setters & Toggless
    @action setName = (val: string) => (this.name = val);
    @action setSurname = (val: string) => (this.surname = val);
    @action setPhone = (val: string) => (this.phone = this._formatPhone(val));
    @action setEmail = (val: string) => (this.email = val);
    @action setPassword = (val: string) => (this.password = val);
    @action setConfirmPassword = (val: string) => (this.confirmPassword = val);
    @action toggleIsMale = () => {
        this.isMale = !this.isMale;
        console.log(123);
    };
    @action toggleAgreeWT = () => (this.agreeWithTerms = !this.agreeWithTerms);
    @action toggleNeedMailing = () => (this.needMailing = !this.needMailing);
    @action toggleShowPassword = () =>
        (this.showPassword = this.password === "" ? false : !this.showPassword);

    @action setNameError = (value?: string) => (this.nameError = value);
    @action setSurnameError = (value?: string) => (this.surnameError = value);
    @action setPhoneError = (value?: string) => (this.phoneError = value);
    @action setEmailError = (value?: string) => (this.emailError = value);
    @action setPasswordError = (value?: string) => (this.passwordError = value);
    @action setConfirmPasswordError = (value?: string) =>
        (this.confirmPasswordError = value);
    @action setErrorMessage = (value?: string) => (this.errorMessage = value);
    @action setShowError = (value: boolean) => (this.showErrorMessage = value);

    // Actions
    @action onPhoneFocus = () => {
        if (this.phone === "") {
            this.phone = "+7 ";
        }
    };

    @action onPhoneBlur = () => {
        if (this.phone === "+7 ") {
            this.phone = "";
        }
    };

    // functions
    _formatPhone = (input: string) => {
        let schema = "*** ***-**-**";
        const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        // cut input country code
        // +7 932 332-73-50 --> 932 332-73-50
        input = input.substring(3);

        // cut last element in user enter too much
        if (input.length > schema.length) {
            input = input.substring(0, schema.length);
        }

        for (let i = 0; i < input.length; i++) {
            const e = input[i];

            if (schema[i] === "*") {
                if (!nums.includes(parseInt(e))) {
                    // if user on i position enter NaN
                    // but number need to be entered
                    return "+7 " + input.substring(0, i);
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
            }
        }

        // if user started removing and last element
        // is formatting " " or "-" -- delete last element
        // to easily erace phone
        const length = input.length;
        if (input[length - 1] === " " || input[length - 1] === "-") {
            input = input.substring(0, length - 1);
        }

        // 932 332-73-50 --> +7 932 332-73-50
        return "+7 " + input;
    };
}

export default new SingupUIStore();
