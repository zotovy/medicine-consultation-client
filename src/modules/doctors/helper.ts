import { YearsTitleComponentProps } from "./components/detail/additional-information/tile";
import { DoctorEducation } from "../../@types/enums";

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
}

