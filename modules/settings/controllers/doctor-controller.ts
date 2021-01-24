import { observable, action, makeObservable } from "mobx";
import { injectable } from "inversify";
import UserStore from "./userStore";
import formatServices from "@/services/format-services";
import { authFetch, EAuthFetch } from "@/services/fetch_services";
import axios from "axios";
import tokenServices from "@/services/token-services";

@injectable()
export default class DoctorSettingsController {

    constructor() {
        makeObservable(this);
    }

    @observable consultationBeginTime: string = "09:00";
    @observable consultationEndTime: string = "18:00";
    @observable selectedDays: number[] = [];
    @observable price: string = "1000";
    @observable consultationDuration: string = "40";
    @observable consultationPause: string = "0";

    load = async (): Promise<void> => {
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser");
        if (!uid || isUser == null) throw "logout";


        if (UserStore.user !== null) {
            const doctor = UserStore.user as DoctorType;
            this.consultationBeginTime = formatServices.formatCustomTime(doctor.workingTime.from);
            this.consultationEndTime = formatServices.formatCustomTime(doctor.workingTime.to);
            this.selectedDays = doctor.workingTime.weekends;
            this.setPrice(doctor.price.toString());
            this.consultationDuration = doctor.workingTime.consultationTimeInMin.toString();
            this.consultationPause = doctor.workingTime.consultationPauseInMin.toString();
            this.isLoading = false;
            return;
        }

        this.isLoading = true;
        const route = `/api/doctor/${uid}`
        const result = await authFetch(() => axios.get(
            process.env.REACT_APP_SERVER_URL + route,
            {
                headers: { auth: tokenServices.header }
            }
        ));

        if (!result || result.status === EAuthFetch.Error) throw "error";
        else if (result.status === EAuthFetch.Unauthorized) throw "logout";
        else {
            action(() => {
                if (!result) throw "error";

                let user;
                if (isUser === "true") user = result.data.user;
                else user = result.data.doctor;

                UserStore.user = user as DoctorType;
                this.consultationBeginTime = formatServices.formatCustomTime(user.workingTime.from);
                this.consultationEndTime = formatServices.formatCustomTime(user.workingTime.to);
                this.selectedDays = user.workingTime.weekends;
                this.consultationDuration = user.workingTime.consultationTimeInMin.toString();
                this.consultationPause = user.workingTime.consultationPauseInMin.toString();
                this.setPrice(user.price.toString());
            })();
        }
        this.isLoading = false;
    }

    save = async (): Promise<void> => {
        if (!this.validate()) return;

        const formatDate = (v: string): { h: number, m: number } => {
            const [hours, minutes] = v.split(":");
            return { h: parseInt(hours), m: parseInt(minutes) };
        }

        const id = localStorage.getItem("uid");
        const res = await authFetch(() => axios.post(
            process.env.REACT_APP_SERVER_URL + `/api/doctor/${id}/update-working-time`,
            {
                from: formatDate(this.consultationBeginTime),
                to: formatDate(this.consultationEndTime),
                consultationTimeInMin: parseInt(this.consultationDuration),
                consultationPauseInMin: parseInt(this.consultationPause),
                weekends: this.selectedDays,
                price: this.price,
            },
            { headers: { auth: tokenServices.header } }
        ));

        console.log(res);
    }

    // UI
    @observable isLoading: boolean = true;
    @observable beginTimeError: string | undefined = undefined;
    @observable endTimeError: string | undefined = undefined;
    @observable workingDaysError: string | undefined = undefined;
    @observable priceError: string | undefined = undefined;
    @observable consultationDurationError: string | undefined = undefined;
    @observable consultationPauseError: string | undefined = undefined;
    doctorWillGet: string = "Вы будете получать 1000₽ за одну консультацию";

    @action validate = (): boolean => {
        this.beginTimeError = undefined;
        this.endTimeError = undefined;
        this.workingDaysError = undefined;
        let isOk = true;

        const validateTime = (time: string): boolean => {
            if (time.length != 5) return false;
            let [hours, minutes] = time.split(":");
            let h = parseInt(hours), m = parseInt(minutes);
            if (h > 23 || h < 0) return false;
            return !(m > 59 || m < 0);
        }

        if (!validateTime(this.consultationBeginTime)) {
            this.beginTimeError = "Время указано неверно"
            isOk = false;
        }
        if (!validateTime(this.consultationEndTime)) {
            this.endTimeError = "Время указано неверно";
            isOk = false;
        }
        if (this.selectedDays.length === 0) {
            this.workingDaysError = "У вас должно быть хотя бы один рабочий день";
            isOk = false;
        }
        const dur = parseInt(this.consultationDuration)
        if (dur >= 180 || dur <= 20) {
            this.consultationDurationError = "Неверный формат. Время консультации должно быть от 20 до 180 минут";
            isOk = false;
        }
        const pause = parseInt(this.consultationDuration)
        if  (pause <= 0) {
            this.consultationPauseError = "Неверный формат. Пауза между консультациями должна быть от 0 до 180 минут";
            isOk = false;
        }

        if (parseInt(this.price) < 300) isOk = false;

        return isOk;
    }

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
        this.doctorWillGet = `${num * commission}₽`;
        if (!num) this.doctorWillGet = "0₽";
    }
}
