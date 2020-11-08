import { observable } from "mobx";
import Time from "../../utils/time";
import Duration from "../../utils/duration";
import formatServices from "../../services/format-services";

class DoctorSettingsController implements ISettingsController{
    // General
    @observable status: "user" | "doctor" = "doctor";

    // Account
    @observable name: string = "Ярослав";
    @observable surname: string = "Зотов";
    @observable patronymic: string = "Сергеевич";
    @observable phone: string = "+7 9323327340";
    @observable birthday: Date = new Date(2005, 10, 21);
    @observable email: string = "the1ime@yandex.ru";
    @observable country: string = "Россия";
    @observable city: string = "Пермь";
    @observable isMale: boolean = true;

    // Doctor
    @observable startConsultationAt: Time = new Time(9, 0);
    @observable endConsultationAt: Time = new Time(22, 0);
    @observable consultationTime: Duration = new Duration(50);

    get fullName(): string {
        return `${this.surname} ${this.name} ${this.patronymic}`;
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

export default new DoctorSettingsController();
