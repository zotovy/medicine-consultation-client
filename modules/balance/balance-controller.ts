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

    public fetchBalanceData = async (): Promise<void> => {
        this.isLoading = true;
        await action(async () => {
            const data = await BalanceService.fetchBalanceData();
            this.balanceAmount = data.balance;
            this.topUpLastMonth = Selector.getBalanceInThisMonth(data.history);
            this.topUpLastYear = Selector.getBalanceInThisYear(data.history);
            this.isLoading = false;
        })();
    }
}

export type TableDataType = {
    date: string[];
    method: string[];
    credentials: string[];
    status: string[];
    amount: string[];
}