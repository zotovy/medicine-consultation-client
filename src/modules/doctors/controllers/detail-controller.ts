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

    // Schedule
    firstWeekSchedule: DayType[] = [];
    secondWeekSchedule: DayType[] = [];

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

export default new DetailController();
