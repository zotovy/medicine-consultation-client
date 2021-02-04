import { TableDataType } from "@/modules/balance/balance-controller";

export default class Domain {
    public static availablePeriods = ["За месяц", "За год", "За 2 года", "За все время"];
    public static periodKeys = ["this_month", "this_year", "last_year", "all_time"];
    public static dataTranslation = {
        date: "Дата",
        method: "Способ",
        credentials: "Реквизиты",
        status: "Статус",
        amount: "Количество",
    }
    public static tableDataKeys: (keyof TableDataType)[] = ["date", "method", "credentials", "status", "amount"];
}

export type BalanceData = {
    balance: number;
    history: ITransaction[],
};

