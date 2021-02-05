import { observable, makeObservable, action, toJS } from "mobx";
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
    @observable chart: DoctorChartDataType | null = null;

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
            this.chart = Selector.getDoctorChartData(data.history, "this_year");
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

    @action public changeChartPeriod = async (period: TransactionPeriod): Promise<void> => {
        // Use cache if this value was already fetched
        if (Object.keys(this.cache.history).includes(period)) {
            this.chart = Selector.getDoctorChartData(this.cache.history[period], period);
            return;
        }

        const data = await BalanceService.fetchBalanceData(period);
        this.chart = Selector.getDoctorChartData(data.history, period);
        this.cache.history[period] = data.history;

        console.log(toJS(this.chart));
    }
}

export type TableDataType = {
    date: string[];
    method: string[];
    credentials: string[];
    status: string[];
    amount: string[];
}

export type DoctorChartDataType = {
    data: {
        chartText: string;
        moneyAmount: number;
    }[];
    maxAmount: number;
}

export type TransactionPeriod = "this_month" | "this_year" | "last_year" | "all_time";

type Cache = {
    history: {
        [key: string]: ITransaction[],
    }
}