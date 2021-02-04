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
}