export default {
    id: Cypress.env("uid"),
    name: "Иван",
    surname: "Иванов",
    patronymic: "Иванович",
    photoUrl: "",
    phone: 79028319028,
    email: "ivanov_ivan@mail.ru",
    password: "ivanovcoolguy911",
    sex: true,
    city: "Москва",
    country: "Россия",
    consultations: [], // will add later
    reviews: [], // will add later
    notificationEmail: "ivanov_ivan@mail.ru",
    sendNotificationToEmail: true,
    sendMailingsToEmail: true,
    createdAt: new Date(),
    lastActiveAt: new Date(),
    favourites: [], // will add later
    fullName: "Иванов Иван Иванович",
    activeConsultations: [],
    balance: 100,
    consultationRequests: [],
    chatsWithHelpers: [],
    age: 25,
    birthday: new Date(1997, 10, 24),
    transactionHistory: [],
    schedule: [],
};

export const tokens = {
    access: "123.123.123",
    refresh: "456.456.456",
}
