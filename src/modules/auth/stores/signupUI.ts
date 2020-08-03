import { observable, action } from "mobx";
import { validateDoctorDataCreation } from "../store";

class SingupUIStore {
    //
    //* Fields
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

    //* Doctor-signup page 2
    @observable institute: string = "";
    @observable speciality: string = "";
    @observable studyYears: string = "";
    @observable blankSeries: string = "";
    @observable blankNumber: string = "";
    @observable issueDate: string = "";

    @observable instituteError?: string = "";
    @observable specialityError?: string = "";
    @observable studyYearsError?: string = "";
    @observable blankSeriesError?: string = "";
    @observable blankNumberError?: string = "";
    @observable issueDateError?: string = "";

    //* Calendar component
    @observable isCalendarOpen: boolean = false;
    @observable isCalendarExist: boolean = false;

    //* Doctor-signup page 3
    @observable passportIssuedByWhom: string = "";
    @observable passportSeries: string = "";
    @observable passportIssueDate: string = "";
    @observable workExperience: string = "";
    @observable workPlaces: string = "";

    @observable passportIssuedByWhomError?: string = "";
    @observable passportSeriesError?: string = "";
    @observable passportIssueDateError?: string = "";
    @observable workExperienceError?: string = "";
    @observable workPlacesError?: string = "";

    @observable pageIndex = 0;
    @observable isBadgeOpen: boolean = false;
    @observable redirectToHomeTrigger = false;

    //* Setters & Toggless
    @action setName = (val: string) => (this.name = val);
    @action setSurname = (val: string) => (this.surname = val);
    @action setPhone = (val: string) => (this.phone = this._formatPhone(val));
    @action setEmail = (val: string) => (this.email = val);
    @action setPassword = (val: string) => (this.password = val);
    @action setConfirmPassword = (val: string) => (this.confirmPassword = val);
    @action toggleIsMale = () => (this.isMale = !this.isMale);
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

    @action goNextPage = () => {
        if (!validateDoctorDataCreation(this.pageIndex + 1)) {
            this.pageIndex += 1;
        }
    };
    @action goBeforePage = () => (this.pageIndex -= 1);

    //* Doctor-signup page 2
    @action setInstitute = (value: string) => (this.institute = value);
    @action setSpeciality = (value: string) => (this.speciality = value);
    @action setStudyYears = (value: string) => (this.studyYears = value);
    @action setBlankSeries = (value: string) => (this.blankSeries = value);
    @action setBlankNumber = (value: string) => (this.blankNumber = value);
    @action setIssueDate = (value: string) => (this.issueDate = value);

    @action setInstituteError = (value?: string) =>
        (this.instituteError = value);
    @action setSpecialityError = (value?: string) =>
        (this.specialityError = value);
    @action setStudyYearsError = (val?: string) => (this.studyYearsError = val);
    @action setBlankSeriesError = (value?: string) =>
        (this.blankSeriesError = value);
    @action setBlankNumberError = (value?: string) =>
        (this.blankNumberError = value);
    @action setIssueDateError = (value?: string) =>
        (this.issueDateError = value);

    //* Calendar
    @action onCalendarOpen = () => {
        this.isCalendarOpen = true;
        this.isCalendarExist = true;
    };
    @action onCalendarClose = () => {
        this.isCalendarOpen = false;
        setTimeout(() => (this.isCalendarExist = false), 500);
    };
    @action onCalendarDateSelected = (date: Date) => {
        this.isCalendarOpen = false;
        setTimeout(() => (this.isCalendarExist = false), 500);

        if (date.getFullYear() === 1000) {
            date = new Date();
        }

        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();

        if (day.length === 1) {
            day = "0" + day;
        }

        if (month.length === 1) {
            month = "0" + month;
        }

        this.issueDate = `${day} / ${month} / ${date.getFullYear()}`;
    };

    //* Doctor-signup page 3
    @action setPassportIssuedByWhom = (value: string) =>
        (this.passportIssuedByWhom = value);
    @action setPassportSeries = (value: string) =>
        (this.passportSeries = value);
    @action setPassportIssueDate = (value: string) =>
        (this.passportIssueDate = value);
    @action setWorkExperience = (value: string) =>
        (this.workExperience = value);
    @action setWorkPlaces = (value: string) => (this.workPlaces = value);

    @action setPassportIssuedByWhomError = (value?: string) =>
        (this.passportIssuedByWhomError = value);
    @action setPassportSeriesError = (value?: string) =>
        (this.passportSeriesError = value);
    @action setPassportIssueDateError = (value?: string) =>
        (this.passportIssueDateError = value);
    @action setWorkExperienceError = (value?: string) =>
        (this.workExperienceError = value);
    @action setWorkPlacesError = (value?: string) =>
        (this.workPlacesError = value);

    //* Actions
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
