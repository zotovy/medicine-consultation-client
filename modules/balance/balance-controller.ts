import { injectable } from "inversify";
import { TableDataType } from "@/modules/balance/components/table";

@injectable()
export default class BalanceController {

    withdrawalsMoneyTable: TableDataType = {
        date: ["30/12/2020", "30/12/2020", "30/12/2020"],
        method: ["Банковская карта", "Банковская карта", "Банковская карта"],
        credentials: ["4402 0401 0493 7118", "4402 0401 0493 7118", "4402 0401 0493 7118"],
        status: ["Успешно", "Успешно", "Успешно"],
        amount: ["5000₽", "5000₽", "5000₽"]
    }

}