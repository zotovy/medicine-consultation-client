import { YearsTitleComponentProps } from "./components/detail/additional-information/tile";
import { DoctorEducation } from "../../@types/enums";
import controller from "./controllers/detail-controller";
import formatServices from "../../services/format-services";
import validateServices from "../../services/validation-services";

export class DoctorDetailHelper {

    public static getWorkPlaces = (workPlaces?: DoctorWorkplaceType[]): YearsTitleComponentProps[] => {
        if (!workPlaces || workPlaces.length === 0) return [];
        return workPlaces.map(e => {
            const years = e.toYear == -1 ? `c ${e.fromYear}` : `${e.fromYear} – ${e.toYear}`;
            return {
                years,
                title: e.organisation,
                subtitle: e.speciality
            }
        });
    }

    public static getEducation = (education?: DoctorEducationType[]):  YearsTitleComponentProps[] => {
        if (!education || education.length === 0) return [];
        return education.map(e => {
            return {
                years: e.year.toString(),
                title: e.institute,
                subtitle: DoctorDetailHelper.translateEducationType(e.education)
            }
        });
    }

    public static translateEducationType = (e: DoctorEducation): string => {
        switch (e) {
            case DoctorEducation.Baccalaureate:
                return "Бакалавриат";
            case DoctorEducation.Specialty:
                return "Специалитет"
            case DoctorEducation.Master:
                return "Магистратура";
            default:
                return "";
        }
    }

    private static getScheduleTime = (date: Date): AppointTime[] => {
        if (!controller.doctor) return [];
        const allTime: {from: Time, to: Time}[] = [];
        const availableTime: {from: Time, to: Time, isOccupied: boolean }[] = [];

        // Add all possible consultation dates
        let time1InMin = controller.doctor.workingTime.from.h * 60 + controller.doctor.workingTime.from.m;
        const time2InMin = controller.doctor.workingTime.to.h * 60 + controller.doctor.workingTime.to.m;
        while (time2InMin > time1InMin + controller.doctor.workingTime.consultationTimeInMin) {
            const finishTimeInMin = time1InMin + controller.doctor.workingTime.consultationTimeInMin;
            allTime.push({
                from: {
                    h: Math.floor(time1InMin / 60),
                    m: time1InMin % 60,
                },
                to: {
                    h: Math.floor(finishTimeInMin / 60),
                    m: finishTimeInMin % 60,
                }
            });
            time1InMin += controller.doctor.workingTime.consultationTimeInMin;
        }

        // Remove occupied time
        allTime.forEach(e => {
            if (!controller.doctor) return;
            let isOccupied = false;
            for (let i = 0; i < controller.doctor.schedule.length; i++) {
                const item = controller.doctor.schedule[i];
                if (!validateServices.theSameDay(item.from, date)) continue;
                const from = e.from.h === item.from.getHours() && e.from.m === item.from.getMinutes();
                const to = e.to.h === item.to.getHours() && e.to.m === item.to.getMinutes();
                if (from || to) {
                    isOccupied = true;
                    break;
                }
            }

            availableTime.push({
                ...e,
                isOccupied
            })

        });
        return availableTime.map(e => ({
            occupied: e.isOccupied,
            time: `${formatServices.formatCustomTime(e.from)} – ${formatServices.formatCustomTime(e.to)}`,
        }));
    }

    public static getScheduleWeek = (fromDate: Date): DayType[] => {
        if (!controller.doctor) return [];
        const days : DayType[] = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(fromDate.getDate() + i);
            const times = DoctorDetailHelper.getScheduleTime(date);

            days.push({
                day: formatServices.formatDayAndMonth(date.getDate(), date.getMonth() + 1),
                dayOfTheWeek: formatServices.getDayOfTheWeek(date.getDay() == 0 ? 6 : date.getDay() - 1),
                times,
                today: validateServices.theSameDay(new Date(), date),
            });
        }
        return days;
    }
}

export type DayType = {
    day: string;
    dayOfTheWeek: string;
    times: AppointTime[];
    today: boolean;
}

export type AppointTime = {
    time: string;
    occupied: boolean;
}

export type Time = {
    h: number, // hours
    m: number, // minutes
}

