import { observable, action } from "mobx";
import axios from "axios";

// Another stores & services
import loginUIStore from "./stores/loginUI";
import signupUIStore from "./stores/signupUI";
import tokenServices from "../../services/token-services";

class AuthStore {
    constructor() {
        this.isLogin = tokenServices.isLogin();

        console.log(`isLogin=${this.isLogin}`);

        // Tokens
        tokenServices.checkAndUpdateToken().then(async (isRefreshTokenOk) => {
            if (!isRefreshTokenOk) {
                this.isLogin = false;
                return null;
            }

            if (this.isLogin) {
                this.uid = localStorage.getItem("uid") ?? "";

                if (this.uid !== "") {
                    const response = await fetchUser(this.uid);

                    this.user = response ?? {};
                }
            }
        });
    }

    // Observables
    @observable user: UserType = {};
    @observable uid?: string;
    @observable isLogin: boolean = false;
    @observable goToHomeTrigger = false; // Use to trigger reaction inside login/signup component to go to home page

    // Action
    @action login = async () => {
        // Remove all past errors
        loginUIStore.setError();

        // Get email & password from ui
        const email = loginUIStore.email;
        const password = loginUIStore.password;

        // validate
        const isEmailOk = validateEmail(email);
        const isPasswordOk = validatePassword(password);

        if (!isEmailOk || !isPasswordOk) {
            loginUIStore.setError("Неверный email или пароль");
            return;
        }

        try {
            // Send data to server
            const response = await axios.post(
                `http://localhost:5000/api/login-user`,
                {
                    email,
                    password,
                }
            );

            //${process.env.REACT_APP_SERVER_URL}

            // if !success --> show error
            if (!response.data.success) {
                loginUIStore.setError("Неверный email или пароль");
                return;
            }

            // Set all data to localstorage & authStore
            this.isLogin = true;
            const id = response.data.id;
            this.uid = id;
            localStorage.setItem("uid", id);

            // Generate & save new tokens
            tokenServices.saveAccessToken(response.data.tokens.access);
            tokenServices.saveRefreshToken(response.data.tokens.refresh);

            // Fetch user based on id
            this.user = (await fetchUser(id)) ?? {};

            // Trigger home trigger to go to home page
            this.goToHomeTrigger = !this.goToHomeTrigger;
        } catch (e) {
            console.log("Some error...");
            console.log(e);
            signupUIStore.setErrorMessage(
                "Произошла неизвестная ошибка. Попробуйте повторить попытку позднее."
            );
        }
    };

    @action signup = async () => {
        // validate data from ui
        const error: boolean = validateUserDataCreation();
        if (error) return;

        // get data from ui
        const name = signupUIStore.name;
        const surname = signupUIStore.surname;
        const phone = parseInt(
            formatStringPhoneToNumberString(signupUIStore.phone)
        );
        const email = signupUIStore.email;
        const password = signupUIStore.password;
        const isMale = signupUIStore.isMale;
        const needMailing = signupUIStore.needMailing;

        // Create user
        const user: UserType = {
            name,
            surname,
            phone,
            email,
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
                .post(`${process.env.REACT_APP_SERVER_URL}/api/user`, user)
                .catch((e) => {
                    return e.response;
                });

            // if !success --> show error
            if (!response.data.success) {
                const hasInvalidError: boolean = validateServerError(
                    response.data.errors
                );
                if (hasInvalidError) {
                    signupUIStore.setErrorMessage(
                        "Произошла непредвиденная ошибка. Повторите попытку позже"
                    );

                    setTimeout(() => {
                        signupUIStore.setErrorMessage();
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

            // Set user
            this.user = user;

            console.log(`Create user with id ${id}`);

            // Trigger home trigger to go to home page
            this.goToHomeTrigger = !this.goToHomeTrigger;
        } catch (e) {
            console.error(e);

            // show error and hide it after 5s
            signupUIStore.setShowError(true);
            signupUIStore.setErrorMessage(
                "Произошла непредвиденная ошибка. Повторите попытку позже"
            );

            setTimeout(() => {
                signupUIStore.setShowError(false);
                setTimeout(() => {
                    signupUIStore.setErrorMessage();
                }, 1000);
            }, 5000);
            return null;
        }
    };

    @action doctorSignup = async () => {
        try {
            // validate data from ui
            if (validateDoctorDataCreation(3)) return;

            const doctor: IBecomeDoctor = {
                name: signupUIStore.name,
                surname: signupUIStore.surname,
                phone: formatStringPhoneToNumberString(signupUIStore.phone),
                email: signupUIStore.email,
                sex: signupUIStore.isMale,
                education: signupUIStore.institute,
                speciality: signupUIStore.speciality,
                yearEducation: signupUIStore.studyYears,
                blankSeries: signupUIStore.blankSeries,
                blankNumber: signupUIStore.blankNumber,
                issueDate: signupUIStore.issueDate,
                workPlaces: signupUIStore.workPlaces,
                passportIssuedByWhom: signupUIStore.passportIssuedByWhom,
                passportIssueDate: signupUIStore.passportIssueDate,
                passportSeries: signupUIStore.passportSeries,
                password: signupUIStore.password,
                workExperience: signupUIStore.workExperience,
            };

            // send doctor to db
            const response = await axios
                .post(
                    `${process.env.REACT_APP_SERVER_URL}/api/doctor-request/send`,
                    doctor
                ) // todo
                .catch((e) => {
                    return e.response;
                });

            // todo

            // Show badge
            signupUIStore.isBadgeOpen = true;
            setTimeout(() => {
                signupUIStore.isBadgeOpen = false;
                setTimeout(() => {
                    signupUIStore.redirectToHomeTrigger = !signupUIStore.redirectToHomeTrigger;
                }, 300);
            }, 3300);
        } catch (e) {
            console.error(e);

            // show error and hide it after 5s
            signupUIStore.setShowError(true);
            signupUIStore.setErrorMessage(
                "Произошла непредвиденная ошибка. Повторите попытку позже"
            );

            setTimeout(() => {
                signupUIStore.setShowError(false);
                setTimeout(() => {
                    signupUIStore.setErrorMessage();
                }, 1250);
            }, 5000);
            return null;
        }
    };
}

// Functions
const fetchUser = async (uid: string): Promise<UserType | null> => {
    try {
        const raw = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/user/${uid}`
        );
        return raw.data.user;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string): boolean => password.length >= 8;

const validateUserDataCreation = (): boolean => {
    signupUIStore.setErrorMessage();
    let hasError = false;

    // name
    if (signupUIStore.name.trim().length === 0) {
        hasError = true;
        signupUIStore.setNameError("Необходимо ввести ваше имя");
    } else {
        signupUIStore.setNameError();
    }

    // surname
    if (signupUIStore.surname.trim().length === 0) {
        hasError = true;
        signupUIStore.setSurnameError("Необходимо ввести вашу фамилию");
    } else {
        signupUIStore.setSurnameError();
    }

    // phone
    if (formatStringPhoneToNumberString(signupUIStore.phone).length !== 11) {
        hasError = true;
        signupUIStore.setPhoneError("Телефон введен неверно");
    } else {
        signupUIStore.setPhoneError();
    }

    // email
    if (signupUIStore.email.trim().length === 0) {
        hasError = true;
        signupUIStore.setEmailError("Необходимо ввести вашу почту");
    } else {
        signupUIStore.setEmailError();
    }

    // password
    if (signupUIStore.password.trim().length < 8) {
        hasError = true;
        signupUIStore.setPasswordError("Минимальная длина пароля - 8 символов");
    } else {
        signupUIStore.setPasswordError();

        // confirm password
        if (signupUIStore.password !== signupUIStore.confirmPassword) {
            hasError = true;
            signupUIStore.setConfirmPasswordError("Пароли должны совпадать");
        } else {
            signupUIStore.setConfirmPasswordError();
        }
    }

    return hasError;
};

export const validateDoctorDataCreation = (stage: number): boolean => {
    // Doctor Model is extends from user model
    signupUIStore.setErrorMessage();
    let hasError = false;

    if (stage === 1) {
        return validateUserDataCreation();
    } else if (stage === 2) {
        // education
        if (signupUIStore.institute.trim().length === 0) {
            hasError = true;
            signupUIStore.setInstituteError(
                "Необходимо указать ваше образование"
            );
        } else {
            signupUIStore.setInstituteError();
        }

        // speciality
        if (signupUIStore.speciality.trim().length === 0) {
            hasError = true;
            signupUIStore.setSpecialityError(
                "Необходимо указать вашу специальность"
            );
        } else {
            signupUIStore.setSpecialityError();
        }

        // year education
        if (signupUIStore.studyYears.trim().length === 0) {
            hasError = true;
            signupUIStore.setStudyYearsError(
                "Необходимо указать годы обучения"
            );
        } else {
            signupUIStore.setStudyYearsError();
        }

        // blankSeries
        if (signupUIStore.blankSeries.trim().length === 0) {
            hasError = true;
            signupUIStore.setBlankSeriesError(
                "Необходимо указать серию бланка"
            );
        } else {
            signupUIStore.setBlankSeriesError();
        }

        // blankSeries
        if (signupUIStore.blankNumber.trim().length === 0) {
            hasError = true;
            signupUIStore.setBlankNumberError(
                "Необходимо указать номер бланка"
            );
        } else {
            signupUIStore.setBlankNumberError();
        }

        // issueDate
        if (signupUIStore.issueDate.trim().length === 0) {
            hasError = true;
            signupUIStore.setIssueDateError("Необходимо указать дату выдачи");
        } else {
            signupUIStore.setIssueDateError();
        }
    } else if (stage === 3) {
        // passportIssuedByWhom
        if (signupUIStore.passportIssuedByWhom.trim().length === 0) {
            hasError = true;
            signupUIStore.setPassportIssuedByWhomError(
                "Необходимо указать кем был выдан ваш паспорт"
            );
        } else {
            signupUIStore.setPassportIssuedByWhomError();
        }

        // passportSeries
        if (signupUIStore.passportSeries.trim().length === 0) {
            hasError = true;
            signupUIStore.setPassportSeriesError("Необходимо указать серию");
        } else {
            signupUIStore.setPassportSeriesError();
        }

        // passportIssueDate
        if (signupUIStore.passportIssueDate.trim().length === 0) {
            hasError = true;
            signupUIStore.setPassportIssueDateError(
                "Необходимо указать дату выдачи"
            );
        } else {
            signupUIStore.setPassportIssueDateError();
        }

        // workExperience
        if (signupUIStore.workExperience.trim().length === 0) {
            hasError = true;
            signupUIStore.setWorkExperienceError("Необходимо указать ваш опыт");
        } else {
            signupUIStore.setWorkExperienceError();
        }

        // workPlaces
        if (signupUIStore.workPlaces.trim().length === 0) {
            hasError = true;
            signupUIStore.setWorkPlacesError(
                "Необходимо указать ваши места работы"
            );
        } else {
            signupUIStore.setWorkPlacesError();
        }
    }

    return hasError;
};

const validateServerError = (errors: any): boolean => {
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
        signupUIStore.setNameError(getFormatError(errors.name));
    }

    // surname
    if (errors.surname) {
        signupUIStore.setSurnameError(getFormatError(errors.surname));
    }

    // phone
    if (errors.phone) {
        if (errors.phone === ServerErrorType.unique_error) {
            signupUIStore.setPhoneError(
                "Этот номер телефона уже привязан к другому аккаунту"
            );
        } else {
            signupUIStore.setPhoneError(getFormatError(errors.name));
        }
    }

    // email
    if (errors.email) {
        if (errors.email === ServerErrorType.unique_error) {
            signupUIStore.setEmailError(
                "Эта почта уже привязана к другому аккаунту"
            );
        } else {
            signupUIStore.setEmailError(getFormatError(errors.name));
        }
    }

    // password
    if (errors.password) {
        signupUIStore.setPasswordError(getFormatError(errors.password));
    }

    // confirm password
    if (errors.confirmPassword) {
        signupUIStore.setConfirmPasswordError(
            getFormatError(errors.confirmPassword)
        );
    }

    return false;
};

const formatStringPhoneToNumberString = (phone: string): string => {
    let withoutPlus = phone.split("+").join("");
    let withoutSpaces = withoutPlus.split(" ").join("");
    let withoutDashes = withoutSpaces.split("-").join("");

    return withoutDashes;
};

export default new AuthStore();
