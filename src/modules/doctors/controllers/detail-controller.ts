import axios from "axios";
import { observable, action } from "mobx";
import settingDoctorController from "../../settings/controllers/account-controller";
import { AppointmentObject } from "../../../../../server/types/models";
import { DayType, DoctorDetailHelper } from "../helper";

class DetailController {

    @observable doctorId: string | undefined;
    @observable doctor: DoctorType | undefined;
    @observable loading: boolean = true;

    // UI
    @observable selectedTabIndex: number = 0;
    @observable selectedWeekIndex: number = 0;
    @observable isScheduleModalWindowOpen: boolean = false;
    @observable selectedQualificationImage: string | null = null;
    @observable isAnySelectedQualificationImage: boolean = false;

    @action public fetchDoctor = (id: string): void => {
        this.loading = true;
        this._fetchDoctor(id).then(
            action((doctor) => {
                this.doctor = doctor;
                this.calcSchedule();
                this.loading = false;
            })
        );
    };

    onErrorCB = () => {}

    private _fetchDoctor = async (
        id: string
    ): Promise<DoctorType | undefined> => {
        const response = await axios
            .get(process.env.REACT_APP_SERVER_URL + "/api/doctor/" + id)
            .then((data) => data.data)
            .catch((e) => e.response);

        if (!response?.success || !response.doctor) {
            this.onErrorCB();
            return;
        }

        try {
            response.doctor.schedule = response.doctor?.schedule?.map((e : AppointmentObject) => {
                e["from"] = new Date(e['from'])
                e['to'] = new Date(e['to']);
                return e;
            });
        } catch (e) {}

        return await response.doctor;
    };

    // todo
    formatExperience = (experience: number): string => {
        if (experience >= 365) return Math.floor(experience / 365) + "";
        if (experience >= 212) return "больше 6 месяцев";
        if (experience >= 182) return "6 месяцев";
        if (experience >= 120) return "больше 3 месяцев";
        if (experience >= 90) return "3 месяца";
        if (experience >= 60) return "2 месяца";
        if (experience >= 30) return "1 месяц";

        if (experience === 0) return "Отсутствует";

        const fEnding = [1, 21];
        const sEnding = [2, 3, 4, 22, 23, 24];
        if (fEnding.includes(experience)) return experience + " день";
        if (sEnding.includes(experience)) return experience + " дня";
        return experience + " дней";
    };

    // Schedule
    firstWeekSchedule: DayType[] = [];
    secondWeekSchedule: DayType[] = [];

    private getWeekDay = (date: Date): number => {
        if (date.getDay() === 0) {
            return 6;
        }

        return date.getDay() - 1;
    };

    private calcSchedule = () => {
        const startFirstWeek = new Date();
        startFirstWeek.setDate(new Date().getDate() - new Date().getDay() + 1)
        const startSecondWeek = new Date();
        startSecondWeek.setDate(new Date().getDate() - new Date().getDay() + 8)

        this.firstWeekSchedule = DoctorDetailHelper.getScheduleWeek(startFirstWeek);
        this.secondWeekSchedule = DoctorDetailHelper.getScheduleWeek(startSecondWeek);
    }

    public getSocialLinks = (): SocialLink[] | null => {
        let links: SocialLink[] = [];

        SocialLinkTypes.forEach(e => {
            if (!this.doctor) return [];
            // @ts-ignore
            const v = this.doctor[`${e}Link`];
            // @ts-ignore
            if (v != null && v != "") links.push({ type: e, href: v })
            console.log(`${e}Link`, v);
        });
        return links;
    }
}

type Time = {
    title: string;
    isOccupied?: boolean;
    x: number;
};

const SocialLinkTypes = [
    "vk", "instagram", "telegram", "whatsApp", "viber", "email",
]

export enum ESocialLinkTypes {
    "vk" = "vk",
    "instagram" = "instagram",
    "telegram" = "telegram",
    "whatsApp" = "whatsApp",
    "viber" = "viber",
    "email" = "email",
}

type SocialLink = {
    type: ESocialLinkTypes,
    href: string
}

export default new DetailController();
