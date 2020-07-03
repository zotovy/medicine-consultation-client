import { observable, action } from "mobx";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";

// Types
import UserType from "../../types/user";
import ServerErrorType from "./types/server-errors";

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
            console.log(`isRefreshTokenOk=${isRefreshTokenOk}`);
            if (!isRefreshTokenOk) {
                this.isLogin = false;
                return null;
            }

            if (this.isLogin) {
                this.uid = localStorage.getItem("uid") ?? "";

                if (this.uid != "") {
                    const responce = await fetchUser(this.uid);

                    this.user = responce ?? {};
                }
            }
        });
    }

    // Observables
    @observable user: UserType = {};
    @observable uid?: string;
    @observable isLogin: boolean = false;

    // Action
    @action login = async () => {
        // Remove all past errors
        loginUIStore.setError();

        console.log(123);

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

        // send data to server
        try {
            const responce = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/login-user`,
                {
                    email,
                    password,
                }
            );

            if (!responce.data.success) {
                loginUIStore.setError("Неверный email или пароль");
                console.log("Неверный email или пароль");
                return;
            }

            this.isLogin = true;
            const id = responce.data.id;
            this.uid = id;
            localStorage.setItem("uid", id);

            await tokenServices.generateNewTokens(id);

            this.user = (await fetchUser(id)) ?? {};
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
            createdAt: moment(),
            lastActiveAt: moment(),
        };

        // send user to db
        try {
            const responce = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/user`,
                {
                    ...user,
                    createdAt: moment().toISOString(),
                    lastActiveAt: moment().toISOString(),
                }
            );

            if (!responce.data.success) {
                const hasInvalidError: boolean = validateServerError(
                    responce.data.error
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
            }

            // Tokens
            const accessToken = responce.data.tokens.access;
            const refreshToken = responce.data.tokens.refresh;

            tokenServices.saveAccessToken(accessToken);
            tokenServices.saveRefreshToken(refreshToken);

            // Save user id
            const id = responce.data.user._id;
            localStorage.setItem("uid", id);

            console.log(`Create user with id ${id}`);
        } catch (e) {
            console.log(e);

            signupUIStore.setErrorMessage(
                "Произошла непредвиденная ошибка. Повторите попытку позже"
            );

            setTimeout(() => {
                signupUIStore.setErrorMessage();
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
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
