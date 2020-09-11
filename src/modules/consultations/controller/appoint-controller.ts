import { observable, action } from "mobx";

import settingsController from "../../settings/controller";
import formatServices from "../../../services/format-services";

class AppointmentController {
    @observable fullName: string = settingsController.fullName;
    @observable fullNameError: string = "";
    @observable birthDay: string = settingsController.birthdayString;
    @observable birthDayError: string = "";
    @observable phone: string = formatServices.formatNumericPhone(
        settingsController.phone
    );
    @observable phoneError: string = "";
    @observable calendarOpen: boolean = false;
    @observable appointmentDate: Date | undefined;
    @observable isMale: boolean = settingsController.isMale;

    @action onCalendarSave = (date: Date): void => {
        this.appointmentDate = date;
        this.calendarOpen = false;
    };

    get formattedAppointmentDate(): string {
        if (!this.appointmentDate) return "";

        return formatServices.formatDate(this.appointmentDate);
    }
}

export default new AppointmentController();
