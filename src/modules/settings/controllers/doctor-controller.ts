import { observable } from "mobx";
import Time from "../../../utils/time";
import Duration from "../../../utils/duration";

class DoctorSettingsController {
    // General
    @observable status: "user" | "doctor" = "doctor";

    // Account
    @observable name: string = "Ярослав";
    @observable surname: string = "Зотов";
    @observable patronymic: string = "Сергеевич";
    @observable phone: number = 79323327340;
    @observable email: string = "the1ime@yandex.ru";
    @observable country: string = "Россия";
    @observable city: string = "Пермь";
    @observable isMale: boolean = true;

    // Doctor
    @observable startConsultationAt: Time = new Time(9, 0);
    @observable endConsultationAt: Time = new Time(22, 0);
    @observable consultationTime: Duration = new Duration(50);
}

export default new DoctorSettingsController();
