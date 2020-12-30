import { observable, action } from "mobx";

class DoctorSettingsController {

    constructor() {
        const commission = parseFloat(process.env.REACT_APP_PEER_CONSULTATION_COMMISSION ?? '');
        this.doctorWillGet = `Вы будете получать ${commission * parseInt(this.price)}₽ за одну консультацию`
    }

    @observable consultationBeginTime: string = "09:00";
    @observable consultationEndTime: string = "18:00";
    @observable selectedDays: number[] = [];
    @observable price: string = "1000";

    save = async () => {}

    // UI
    @observable beginTimeError: string | undefined = undefined;
    @observable endTimeError: string | undefined = undefined;
    @observable priceError: string | undefined = undefined;
    doctorWillGet: string = "Вы будете получать 1000₽ за одну консультацию";

    @action setPrice = (val: string) => {
        this.price = val;
        const num = parseInt(val);
        const min = parseInt(process.env.REACT_APP_PEER_MIN_DOCTOR_PRICE ?? '');
        const commission = parseFloat(process.env.REACT_APP_PEER_CONSULTATION_COMMISSION ?? '');

        if (num < min) {
            this.priceError = "Стоимость не может быть меньше 300₽";
            return;
        }
        this.priceError = undefined;
        this.doctorWillGet = `Вы будете получать ${num * commission}₽ за одну консультацию`;
    }
}

export default new DoctorSettingsController();