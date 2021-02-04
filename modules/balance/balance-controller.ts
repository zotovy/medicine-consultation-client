import { observable, makeObservable, action } from "mobx";
import { injectable } from "inversify";
import BalanceService from "./balance-service";
import Selector from "@/modules/balance/selector";

@injectable()
export default class BalanceController {

    constructor() {
        makeObservable(this);
    }

    // State
    @observable isLoading: boolean = true;
    @observable balanceAmount: number = 0;
    @observable topUpLastMonth: number = 0;
    @observable topUpLastYear: number = 0;
    @observable withdrawalsMoneyTable: TableDataType | null = null;
    @observable topUpMoneyTable: TableDataType | null = null;

    private cache: Cache = {
        history: {},
    }

    public load = async (): Promise<void> => {
        this.isLoading = true;
        await action(async () => {
            const data = await BalanceService.fetchBalanceData("this_year");
            this.balanceAmount = data.balance;
            this.topUpLastMonth = Selector.getBalanceInThisMonth(data.history);
            this.topUpLastYear = Selector.getBalanceInThisYear(data.history);
            this.topUpMoneyTable = Selector.getTableData(data.history, "top_up")
            this.withdrawalsMoneyTable = Selector.getTableData(data.history, "withdrawals")
            this.isLoading = false;
            this.cache.history["this_year"] = data.history;
        })();
    }

    @action public changeTablePeriod = async (period: TransactionPeriod, table: "withdrawals" | "top_up"): Promise<void> => {
        const change = (data: ITransaction[]) => {
            if (table === "withdrawals") this.withdrawalsMoneyTable = Selector.getTableData(data, table)
            else this.topUpMoneyTable = Selector.getTableData(data, table)
        }

        // Use cache if this value was already fetched
        if (Object.keys(this.cache.history).includes(period)) {
            change(this.cache.history[period]);
            return;
        }

        const data = await BalanceService.fetchBalanceData(period);
        change(data.history);
        this.cache.history[period] = data.history;
        this.isLoading = false;
    }
}

export type TableDataType = {
    date: string[];
    method: string[];
    credentials: string[];
    status: string[];
    amount: string[];
}

export type TransactionPeriod = "this_month" | "this_year" | "last_year" | "all_time";

type Cache = {
    history: {
        [key: string]: ITransaction[],
    }
}