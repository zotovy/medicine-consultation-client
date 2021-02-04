import { TableDataType } from "@/modules/balance/balance-controller";
import FormatServices from "@/services/format-services";

export default class Selector {

    private static getBalanceInThisTime = (history: ITransaction[], date: Date): number => {
        let amount = 0;
        const endDateTime = date.getTime()
        for (let transaction of history) {
            const date = new Date(transaction.date);
            // use sorting of history array
            if (date.getTime() < endDateTime) return amount;
            amount += transaction.amount;
        }
        return amount;
    }

    public static getBalanceInThisMonth = (history: ITransaction[]): number => {
        const now = new Date();
        const endData = new Date(now.getFullYear(), now.getMonth(), 1);
        return Selector.getBalanceInThisTime(history, endData);
    }

    public static getBalanceInThisYear = (history: ITransaction[]): number => {
        const now = new Date();
        const endData = new Date(now.getFullYear(), 0, 1);
        return Selector.getBalanceInThisTime(history, endData);
    }

    public static getTableData = (history: ITransaction[], direction: "withdrawals" | "top_up"): TableDataType => {
        let data: TableDataType = {
            amount: [],
            status: [],
            credentials: [],
            method: [],
            date: [],
        };

        for (let transaction of history) {
            if (transaction.direction !== direction) continue;
            data.date.push(FormatServices.formatDate(new Date(transaction.date)).split(" ").join(""));
            data.method.push(Selector.translateTransactionMethod[transaction.paymentMethod]);
            data.credentials.push(transaction.bankDetails);
            data.status.push(Selector.translateTransactionStatus[transaction.status]);
            data.amount.push(`${transaction.amount.toLocaleString()}₽`);
        }

        return data;
    }

    private static translateTransactionStatus: any = {
        "waiting_for_capture": "Ожидание перевода",
        "succeeded": "Успешно",
        "canceled": "Отклонен"
    };

    private static translateTransactionMethod: any = {
        "bank_card": "Банковская карта",
        "apple_pay": "Apple Pay",
        "google_pay": "Google Pay",
        "yoo_money": "YooMoney",
        "qiwi": "Qiwi",
        "webmoney": "Webmoney",
        "sberbank": "Сбербанк",
        "alfabank": "Альфабанк",
        "tinkoff_bank": "Тинькофф",
        "b2b_sberbank": "Б2Б Сбербанк",
        "mobile_balance": "Баланс телефона",
        "cash": "Наличные",
        "installments": "Рассрочка",
    }
}

