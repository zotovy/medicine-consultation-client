import { action, observable } from "mobx";
import Time from "../../utils/time";
import Duration from "../../utils/duration";
import formatServices from "../../services/format-services";
import { AFRes, authFetch, EAuthFetch } from "../../services/fetch_services";
import axios from "axios";
import token_services from "../../services/token-services";

class SettingsController implements ISettingsController{
    // General
    @observable status: "user" | "doctor" = "doctor";
    @observable isLoading : boolean = true;

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

    // Doctor
    @observable startConsultationAt: Time = new Time(9, 0);
    @observable endConsultationAt: Time = new Time(22, 0);
    @observable consultationTime: Duration = new Duration(50);

    fetchUser = async () : Promise<void> => {
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!uid || isUser == null) throw "logout";

        let result : AFRes | undefined;
        this.isLoading = true;
        if (isUser) result =  await this._fetchUser(uid);
        this.isLoading = false;

        console.log(result);

        if (!result || result.status === EAuthFetch.Error) throw "error";
        else if (result.status === EAuthFetch.Unauthorized) throw "logout";
        else {
            action(() => {
                if (!result) throw "error";

                let user;
                if (isUser) user = result.data.user;

                this.name = user.name;
                this.startConsultationAt = user.surname;
                this.patronymic = user.patronymic;
                this.phone = formatServices.formatNumericPhone(user.phone ?? 0);
                this.birthday = user.birthday;
                this.email = user.email;
                this.country = user.country;
                this.city = user.city;
                this.isMale = user.sex;

                // todo: add another fields
            })();
        }
    }

    private _fetchUser = async (id : string) : Promise<AFRes> =>
        await authFetch(() => axios.get(
            process.env.REACT_APP_SERVER_URL + `/api/user/${id}`,
            {
                headers: {
                    auth: token_services.header
                }
            }
            ));

    get fullName(): string {
        return `${this.surname ?? ""} ${this.name ?? ""} ${this.patronymic ?? ""}`;
    }

    get location(): string {
        let location = "";
        if (this.city) location = this.city;
        else if (this.city && this.country) location = `${this.city}, ${this.country}`;
        else if (this.country) location = this.country;
        return location;
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
