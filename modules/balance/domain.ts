export default class Domain {
    public static availablePeriods = ["За месяц", "За 6 месяцев", "За год", "За 2 года", "За все время"];
    public static dataTranslation = {
        date: "Дата",
        method: "Способ",
        credentials: "Реквизиты",
        status: "Статус",
        amount: "Количество",
    }
}

export type BalanceData = {
    balance: number;
    history: ITransaction[],
};

