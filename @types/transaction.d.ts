declare enum TransactionDirection {
    "top_up" = "top_up",            // пополнение баланса
    "withdrawals" = "withdrawals",  // вывод с баланса
}

declare enum PaymentMethod {
    "bank_card" = "bank_card",       // оплата произведена с карты
    "web_money" = "web_money",       // оплата произведена с Qiwi / Webmoney
    "web_bank" = "web_bank",         // оплата произведена с интернет банка (сбер, тинкофф...)
    "b2b" = "b2b",                   // оплата от коммерческих организаций
    "other" = "other",              // оплата другими способами (баланс телефона...)
}

declare enum TransactionType {
    "bank_card" = "bank_card",
    "apple_pay" = "apple_pay",
    "google_pay" = "google_pay",
    "yoo_money" = "yoo_money",
    "qiwi" = "qiwi",
    "webmoney" = "webmoney",
    "sberbank" = "sberbank",
    "alfabank" = "alfabank",
    "tinkoff_bank" = "tinkoff_bank",
    "b2b_sberbank" = "b2b_sberbank",
    "mobile_balance" = "mobile_balance",
    "cash" = "cash",
    "installments" = "installments",
}

declare enum TransactionStatus {
    "waiting_for_capture" = "waiting_for_capture",
    "succeeded" = "succeeded",
    "canceled" = "canceled"
}

declare interface ITransaction {
    _id: string;
    direction: TransactionDirection,
    date: Date,
    paymentMethod: PaymentMethod,
    transactionType: TransactionType,
    status: TransactionStatus,
    amount: number,
    bankDetails: string
}
