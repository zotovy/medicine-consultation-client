import { Selector, ClientFunction } from "testcafe";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

/**
 *  ? This test module testing Login Page (Integration tests)
 *
 *  Every test have similar structure consisting of 3 parts
 *  • Arrange  —— initializes objects and sets the value of data passed to the method for the test.
 *  • Act  —— calls a method for the test with the placed parameters.
 *  • Assert  —— checks that the method for the test works as expected.
 *
 *  The test module is considered passed if all test cases were passed correctly
 *  All test modules will run by `npm run test` after commiting to master. Changes will apply only if all tests were passed
 *
 *  TestCafe - browser controller
 *  Express - fake server api (mock)
 *  Jest - launch, structure, asserts, statistic
 */

// Sample User will use or modify for some cases
const sampleUser: UserType = {
    id: undefined,
    name: "Иван",
    surname: "Иванов",
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
};

let mock: MockAdapter = new MockAdapter(axios);

fixture("Signup page tests")
    .page("http://localhost:3000/signup")
    .afterEach(async (t) => {
        await ClientFunction(() => localStorage.clear())();
    });

const getLocalStorageItem = ClientFunction((prop) => {
    return localStorage.getItem(prop);
});

// test("Should signup user");
