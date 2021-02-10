import FormatServices from "@/services/format-services";

export default class Selector {
    public static getAppointDate = (from: Date, to: Date): string => {
        // Convert date to correct format
        return `${FormatServices.formatDayAndMonth(from.getDate(), from.getMonth() + 1)},
         ${FormatServices.formatTime(from)} - ${FormatServices.formatTime(to)}`;
    }
}
