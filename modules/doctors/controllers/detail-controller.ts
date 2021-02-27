import axios from "axios";
import { observable, action, makeObservable } from "mobx";
import { injectable } from "inversify";
import { DayType, DoctorDetailHelper } from "../helper";

@injectable()
export default class DetailController {

    constructor() {
        makeObservable(this);
    }

    @observable doctorId: string | undefined;
    @observable doctor: DoctorType | undefined;
    @observable loading: boolean = true;

    // UI
    @observable selectedTabIndex: number = 0;
    @observable selectedWeekIndex: number = 0;
    @observable isScheduleModalWindowOpen: boolean = false;
    @observable selectedQualificationImage: string | null = null;
    @observable isAnySelectedQualificationImage: boolean = false;
    @observable isMobileInformationPageOpen = false;

    @action public fetchDoctor = (id: string): void => {
        this.loading = true;
        this._fetchDoctor(id).then(
            action((doctor: DoctorType | undefined) => {
                this.doctor = doctor;
                this.calcSchedule();
                this.loading = false;
            })
        );
    };

    onErrorCB = () => {}

    @action setDoctor = (doctor: DoctorType) => {
        this.doctor = doctor;
        this.doctorId = doctor.id;
        this.loading = false;
        this.calcSchedule();
    }

    _fetchDoctor = async (
        id: string
    ): Promise<DoctorType | undefined> => {
        const response = await axios
            .get(process.env.SERVER_URL + "/api/doctor/" + id)
            .then((data) => data.data)
            .catch((e) => e.response);

        if (!response?.success || !response.doctor) {
            this.onErrorCB();
            return;
        }

        try {
            response.doctor.schedule = response.doctor?.schedule?.map((e : Schedule) => {
                e["from"] = new Date(e['from'])
                e['to'] = new Date(e['to']);
                return e;
            });
        } catch (e) {}

        return await response.doctor;
    };

    // Schedule
    schedule: DayType[] = [];

    private calcSchedule = () => {
        // Change this value if you want to display another amount of weeks
        const amountOfWeeks = 2;

        for (let i = 0; i < amountOfWeeks; i++) {
            const startOfTheWeek = new Date();
            startOfTheWeek.setDate(new Date().getDate() - new Date().getDay() + i * 7 + 1)
            const schedule = DoctorDetailHelper.getScheduleWeek(this, startOfTheWeek);
            this.schedule = this.schedule.concat(schedule)
        }
    }

    public getSocialLinks = (): SocialLink[] | null => {
        let links: SocialLink[] = [];

        SocialLinkTypes.forEach(e => {
            if (!this.doctor) return [];
            // @ts-ignore
            const v = this.doctor[`${e}Link`];
            // @ts-ignore
            if (v != null && v != "") links.push({ type: e, href: v })
        });
        return links;
    }
}


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
