import { observable, action, makeObservable } from "mobx";
import { injectable } from "inversify";
import FormatServices from "../../../services/format-services";
import axios from "axios";
import tokenServices from "../../../services/token-services";
import StorageServices from "../../../services/storage_services";
import validationServices from "../../../services/validation-services";
import { ServerErrorType } from "../@types/server-errors";

@injectable()
export default class SingupUIStore {
    constructor() {
        makeObservable(this);
    }

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

    @observable goToHomeTrigger = false; // Use to trigger reaction inside login/signup component to go to home page

    //* Setters & Toggless
    @action setName = (val: string) => (this.name = val);
    @action setSurname = (val: string) => (this.surname = val);
    @action setPhone = (val: string) =>
        (this.phone = FormatServices.formatPhone(val));
    @action setEmail = (val: string) => (this.email = val);
    @action setPassword = (val: string) => (this.password = val);
    @action setConfirmPassword = (val: string) => (this.confirmPassword = val);
    @action toggleIsMale = () => (this.isMale = !this.isMale);
    @action toggleAgreeWT = () => {
        this.agreeWithTerms = !this.agreeWithTerms;
        console.log(this.agreeWithTerms);
    }
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
        if (!this.validateDoctorDataCreation(this.pageIndex + 1)) {
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

    @action signup = async () => {
        // validate data from ui
        const error: boolean = this.validateUserDataCreation();
        if (error) return;

        // get data from ui
        const name = this.name;
        const surname = this.surname;
        const phone = parseInt(
            this.phone
                .replaceAll("+", "")
                .replaceAll(" ", "")
                .replaceAll("-", "")
        );
        const email = this.email;
        const password = this.password;
        const isMale = this.isMale;
        const needMailing = this.needMailing;

        // Create user
        const user: UserType = {
            id: "",
            name,
            surname,
            phone,
            email,
            fullName: `${name} ${surname}`,
            password,
            sex: isMale,
            city: "",
            country: "",
            consultations: [],
            reviews: [],
            notificationEmail: email,
            sendNotificationToEmail: needMailing,
            sendMailingsToEmail: needMailing,
            createdAt: new Date(),
            lastActiveAt: new Date(),
            favourites: [],
            photoUrl: "",
        };

        try {
            // send user to db
            const response = await axios
                .post(`${process.env.SERVER_URL}/api/user`, user)
                .catch((e) => {
                    return e.response;
                });

            // if !success --> show error
            if (!response.data.success) {
                const hasInvalidError: boolean = this.validateServerError(
                    response.data.errors
                );
                if (hasInvalidError) {
                    this.setErrorMessage(
                        "Произошла непредвиденная ошибка. Повторите попытку позже"
                    );

                    setTimeout(() => {
                        this.setErrorMessage();
                    }, 5000);
                    return null;
                }

                return;
            }

            // Tokens
            const accessToken = response.data.tokens.access;
            const refreshToken = response.data.tokens.refresh;

            // save given tokens
            tokenServices.saveAccessToken(accessToken);
            tokenServices.saveRefreshToken(refreshToken);

            // Save user id
            const id = response.data.user.id;
            localStorage.setItem("uid", id);
            localStorage.setItem("isUser", "true");

            // Set user
            if (user) {
                StorageServices.saveUser(user);
            }
            console.log(`Create user with id ${id}`);

            // Trigger home trigger to go to home page
            this.goToHomeTrigger = !this.goToHomeTrigger;
        } catch (e) {
            console.error(e);

            // show error and hide it after 5s
            this.setShowError(true);
            this.setErrorMessage(
                "Произошла непредвиденная ошибка. Повторите попытку позже"
            );

            setTimeout(() => {
                this.setShowError(false);
                setTimeout(() => {
                    this.setErrorMessage();
                }, 1000);
            }, 5000);
            return null;
        }
    };

    @action doctorSignup = async () => {
        try {
            // validate data from ui
            if (this.validateDoctorDataCreation(3)) return;

            const doctor: IBecomeDoctor = {
                name: this.name,
                surname: this.surname,
                phone: FormatServices.formatPhone(this.phone),
                email: this.email,
                sex: this.isMale,
                education: this.institute,
                speciality: this.speciality,
                yearEducation: this.studyYears,
                blankSeries: this.blankSeries,
                blankNumber: this.blankNumber,
                issueDate: this.issueDate,
                _workPlaces: this.workPlaces,
                passportIssuedByWhom: this.passportIssuedByWhom,
                passportIssueDate: this.passportIssueDate,
                passportSeries: this.passportSeries,
                password: this.password,
                _workExperience: this.workExperience,
            };

            // send doctor to db
            const response = await axios
                .post(
                    `${process.env.SERVER_URL}/api/doctor-request/send`,
                    doctor
                )
                .catch((e) => {
                    return e.response;
                });

            // if !success --> show error
            if (!response?.data?.success) {
                const hasInvalidError: boolean = this.validateServerError(
                    response.data.errors
                );
                if (hasInvalidError) {
                    this.setErrorMessage(
                        "Произошла непредвиденная ошибка. Повторите попытку позже"
                    );

                    setTimeout(() => {
                        this.setErrorMessage();
                    }, 5000);
                    return null;
                }

                return;
            }


            // Show badge
            this.isBadgeOpen = true;
            setTimeout(() => {
                this.isBadgeOpen = false;
                setTimeout(() => {
                    this.redirectToHomeTrigger = !this.redirectToHomeTrigger;
                }, 300);
            }, 3300);
        } catch (e) {
            console.error(e);

            // show error and hide it after 5s
            this.setShowError(true);
            this.setErrorMessage(
                "Произошла непредвиденная ошибка. Повторите попытку позже"
            );

            setTimeout(() => {
                this.setShowError(false);
                setTimeout(() => {
                    this.setErrorMessage();
                }, 1250);
            }, 5000);
            return null;
        }
    };

    private validateUserDataCreation = (): boolean => {
        this.setErrorMessage();
        let hasError = false;

        // name
        if (this.name.trim().length === 0) {
            hasError = true;
            this.setNameError("Необходимо ввести ваше имя");
        } else {
            this.setNameError();
        }

        // surname
        if (this.surname.trim().length === 0) {
            hasError = true;
            this.setSurnameError("Необходимо ввести вашу фамилию");
        } else {
            this.setSurnameError();
        }

        // phone
        if (this.phone.length !== 16) {
            hasError = true;
            this.setPhoneError("Телефон введен неверно");
        } else {
            this.setPhoneError();
        }

        // email
        if (!validationServices.email(this.email)) {
            hasError = true;
            this.setEmailError("Необходимо ввести вашу почту");
        } else {
            this.setEmailError();
        }

        // password
        if (this.password.trim().length < 8) {
            hasError = true;
            this.setPasswordError("Минимальная длина пароля - 8 символов");
        } else {
            this.setPasswordError();

            // confirm password
            if (this.password !== this.confirmPassword) {
                hasError = true;
                this.setConfirmPasswordError("Пароли должны совпадать");
            } else {
                this.setConfirmPasswordError();
            }
        }

        return hasError;
    };

    private validateDoctorDataCreation = (stage: number): boolean => {
        // Doctor Model is extends from user model
        this.setErrorMessage();
        let hasError = false;

        if (stage === 1) {
            return this.validateUserDataCreation();
        } else if (stage === 2) {
            // education
            if (this.institute.trim().length === 0) {
                hasError = true;
                this.setInstituteError(
                    "Необходимо указать ваше образование"
                );
            } else {
                this.setInstituteError();
            }

            // speciality
            if (this.speciality.trim().length === 0) {
                hasError = true;
                this.setSpecialityError(
                    "Необходимо указать вашу специальность"
                );
            } else {
                this.setSpecialityError();
            }

            // year education
            if (this.studyYears.trim().length === 0) {
                hasError = true;
                this.setStudyYearsError(
                    "Необходимо указать годы обучения"
                );
            } else {
                this.setStudyYearsError();
            }

            // blankSeries
            if (this.blankSeries.trim().length === 0) {
                hasError = true;
                this.setBlankSeriesError(
                    "Необходимо указать серию бланка"
                );
            } else {
                this.setBlankSeriesError();
            }

            // blankSeries
            if (this.blankNumber.trim().length === 0) {
                hasError = true;
                this.setBlankNumberError(
                    "Необходимо указать номер бланка"
                );
            } else {
                this.setBlankNumberError();
            }

            // issueDate
            if (this.issueDate.trim().length === 0) {
                hasError = true;
                this.setIssueDateError("Необходимо указать дату выдачи");
            } else {
                this.setIssueDateError();
            }
        } else if (stage === 3) {
            // passportIssuedByWhom
            if (this.passportIssuedByWhom.trim().length === 0) {
                hasError = true;
                this.setPassportIssuedByWhomError(
                    "Необходимо указать кем был выдан ваш паспорт"
                );
            } else {
                this.setPassportIssuedByWhomError();
            }

            // passportSeries
            if (this.passportSeries.trim().length === 0) {
                hasError = true;
                this.setPassportSeriesError("Необходимо указать серию");
            } else {
                this.setPassportSeriesError();
            }

            // passportIssueDate
            if (this.passportIssueDate.trim().length === 0) {
                hasError = true;
                this.setPassportIssueDateError(
                    "Необходимо указать дату выдачи"
                );
            } else {
                this.setPassportIssueDateError();
            }

            // workExperience
            if (this.workExperience.trim().length === 0) {
                hasError = true;
                this.setWorkExperienceError("Необходимо указать ваш опыт");
            } else {
                this.setWorkExperienceError();
            }

            // workPlaces
            if (this.workPlaces.trim().length === 0) {
                hasError = true;
                this.setWorkPlacesError(
                    "Необходимо указать ваши места работы"
                );
            } else {
                this.setWorkPlacesError();
            }
        }

        return hasError;
    };
    
    private validateServerError = (errors: any): boolean => {
        const getFormatError = (type: ServerErrorType) => {
            switch (type) {
                case ServerErrorType.email_format_error:
                    return "Неверный формат";
                case ServerErrorType.length_error:
                    return "Это поле обязательно";
                case ServerErrorType.phone_format_number:
                    return "Неверный номер телефона";
                case ServerErrorType.required_error:
                    return "Это поле обязательно";
                case ServerErrorType.unique_error:
                    return "Этот email уже занят";
            }
        };

        console.log(errors);

        const keys = Object.keys(errors);

        // check invalid_error
        const values = Object.values(ServerErrorType.invalid_error);
        if (values.includes(ServerErrorType.invalid_error) || keys.length === 0) {
            return false;
        }

        // name
        if (errors.name) {
            this.setNameError(getFormatError(errors.name));
        }

        // surname
        if (errors.surname) {
            this.setSurnameError(getFormatError(errors.surname));
        }

        // phone
        if (errors.phone) {
            if (errors.phone === ServerErrorType.unique_error) {
                this.setPhoneError(
                    "Этот номер телефона уже привязан к другому аккаунту"
                );
            } else {
                this.setPhoneError(getFormatError(errors.name));
            }
        }

        // email
        if (errors.email) {
            if (errors.email === ServerErrorType.unique_error) {
                this.setEmailError(
                    "Эта почта уже привязана к другому аккаунту"
                );
            } else {
                this.setEmailError(getFormatError(errors.name));
            }
        }

        // password
        if (errors.password) {
            this.setPasswordError(getFormatError(errors.password));
        }

        // confirm password
        if (errors.confirmPassword) {
            this.setConfirmPasswordError(
                getFormatError(errors.confirmPassword)
            );
        }

        return false;
    };
}

