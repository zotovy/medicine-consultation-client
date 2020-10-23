import { observable, action } from "mobx";

import settingsController from "../../settings/controller";
import formatServices from "../../../services/format-services";

const visaRegEx = /^4/;
const mastercardRegEx = /^(5[1-5]|(?:222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720))/;
const mircardRegex = /^220[0-4]/;

class AppointmentController {
    @observable pageIndex: number = 0;

    // Page 1
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

    // Page 2
    @observable chronicDisease: string = "";
    @observable symptoms: string = "";
    @observable documents: File[] = [];

    setDocuments = (docs: FileList | null) => {
        if (docs !== null) {
            this.documents.push(docs[0]);
        }
    };

    removeDocuments = (index: number) => {
        this.documents = this.documents.filter((_, i) => i !== index);
    };

    @action onCalendarSave = (date: Date): void => {
        this.appointmentDate = date;
        this.calendarOpen = false;
    };

    // Page 3
    @observable cardNumber: string = "";
    @observable cardIcon: string = "";
    @observable cardOwner: string = "";
    @observable cardTime: string = "";
    @observable cvv: string = "";

    @action setIcon = (value: string): void => {
        if (value.length === 0) this.cardIcon = "";
        else if (visaRegEx.test(value)) this.cardIcon = "visa";
        else if (mastercardRegEx.test(value)) this.cardIcon = "mastercard";
        else if (mircardRegex.test(value)) this.cardIcon = "mir";
        this.cardNumber = formatServices.formatCard(value);
    };

    @action setCardTime = (value: string) =>
        (this.cardTime = formatServices.formatBySchema("**/**", value));

    @action setCVV = (value: string) =>
        (this.cvv = formatServices.formatBySchema("***", value));

    get formattedAppointmentDate(): string {
        if (!this.appointmentDate) return "";

        return formatServices.formatDate(this.appointmentDate);
    }
}

export default new AppointmentController();
