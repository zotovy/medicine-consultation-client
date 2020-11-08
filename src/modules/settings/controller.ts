import { action, observable } from "mobx";
import Time from "../../utils/time";
import Duration from "../../utils/duration";
import formatServices from "../../services/format-services";
import { AFRes, authFetch, EAuthFetch } from "../../services/fetch_services";
import axios from "axios";
import token_services from "../../services/token-services";

class SettingsController implements ISettingsController {
    // General
    @observable status: "user" | "doctor" = "doctor";
    @observable isLoading: boolean = true;
    @observable isLoadingSave: boolean = false;


    // Account
    @observable profileImage: string = "";
    @observable name: string = "Ярослав";
    @observable surname: string = "Зотов";
    @observable patronymic: string = "Сергеевич";
    @observable phone: string = "+7 9323327340";
    @observable birthday: Date = new Date(2005, 10, 21);
    @observable email: string = "the1ime@yandex.ru";
    @observable country: string = "Россия";
    @observable city: string = "Пермь";
    @observable isMale: boolean = true;
    @observable isCalendarOpen: boolean = false;
    @observable fullName: string = "";
    @observable location: string = "";

    // Doctor
    @observable startConsultationAt: Time = new Time(9, 0);
    @observable endConsultationAt: Time = new Time(22, 0);
    @observable consultationTime: Duration = new Duration(50);

    fetchUser = async (): Promise<void> => {
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!uid || isUser == null) throw "logout";

        let result: AFRes | undefined;
        this.isLoading = true;
        if (isUser) result = await this._fetchUser(uid);
        this.isLoading = false;

        if (!result || result.status === EAuthFetch.Error) throw "error";
        else if (result.status === EAuthFetch.Unauthorized) throw "logout";
        else {
            action(() => {
                if (!result) throw "error";

                let user;
                if (isUser) user = result.data.user;
                console.log(user);

                this.name = user.name;
                this.surname = user.surname;
                this.profileImage = user.photoUrl;
                this.surname = user.surname;
                this.patronymic = user.patronymic;
                this.phone = formatServices.formatNumericPhone(user.phone ?? 0);
                this.birthday = new Date(user.birthday);
                this.email = user.email;
                this.country = user.country;
                this.city = user.city;
                this.isMale = user.sex;
                this.fullName = `${user.name} ${user.surname}`;

                if (this.city && this.country) this.location = `${this.city}, ${this.country}`;
                else if (this.city) this.location = this.city;
                else if (this.country) this.location = this.country;

                // todo: add another fields
            })();
        }
    }

    private _fetchUser = async (id: string): Promise<AFRes> =>
        await authFetch(() => axios.get(
            process.env.REACT_APP_SERVER_URL + `/api/user/${id}`,
            {
                headers: {
                    auth: token_services.header
                }
            }
        ));

    saveAccountSettings = async (): Promise<void> => {
        this.isLoadingSave = true;
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!uid || isUser == null) throw "logout";

        const route = isUser ? `/api/user/${uid}` : `/api/doctor/${uid}`
        const res = await authFetch(() => axios.put(
            process.env.REACT_APP_SERVER_URL + route,
            {
                id: uid,
                name: this.name,
                surname: this.surname,
                patronymic: this.patronymic,
                phone: formatServices.toNumericPhone(this.phone),
                email: this.email,
                birthday: this.birthday.toISOString(),
                country: this.country,
                city: this.city,
                sex: this.isMale,
            },
            {
                headers: {
                    auth: token_services.header
                },
            }));

        this.isLoadingSave = false;
        if (res.status === EAuthFetch.Error) throw "error";
        else if (res.status === EAuthFetch.Unauthorized) throw "login";

    }

    changeProfilePic = async (files: FileList | null) : Promise<void> => {
        if (files === null) return;
        this.isLoadingSave = true;
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!uid || isUser == null) throw "logout";

        const bodyFormData = new FormData();
        bodyFormData.append("1", files[0]);

        const route = isUser ? `/api/user/setAvatar/${uid}` : `/api/doctor/${uid}`
        const res = await authFetch(() => axios({
            method: "POST",
            url: process.env.REACT_APP_SERVER_URL + route,
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data', auth: token_services.header },
        }));

        action(() => {
            this.isLoadingSave = false;
            if (res.status === EAuthFetch.Error) throw "error";
            else if (res.status === EAuthFetch.Unauthorized) throw "login";
            else {
                this.profileImage = res.data.photoUrlPath;
            }
        })();

    }

    get birthdayString(): string {
        return formatServices.formatDate(this.birthday);
    }
}

export interface ISettingsController {
    name: string;
    surname: string;
    patronymic: string;
    phone: string;
    email: string;
    birthday: Date;
    country: string;
    city: string
    isMale: boolean;
}

export default new SettingsController();
