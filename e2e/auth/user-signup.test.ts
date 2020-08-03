import { Selector } from "testcafe";
import {
    clearLocalStorage,
    getLocalStorageItem,
} from "../helpers/localstorage";
import { getUrl } from "../helpers/other";
import { clearFakeServerUserStorage, getUsers } from "../helpers/auth";

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
    favourites: [],
};

fixture("Signup page tests")
    .page("http://localhost:3000/signup")
    .afterEach(async () => {
        await clearFakeServerUserStorage();
        await clearLocalStorage();
    });

test("Should signup user", async (t) => {
    //* Act
    await t
        .typeText('[data-test="name"]', sampleUser.name)
        .typeText('[data-test="surname"]', sampleUser.surname)
        .typeText('[data-test="phone"]', sampleUser.phone.toString())
        .typeText('[data-test="email"]', sampleUser.email)
        .typeText('[data-test="password"]', sampleUser.password)
        .typeText('[data-test="confirm-password"]', sampleUser.password)
        .click('[data-test="confirm"]');

    //* Assert
    await t.expect(await getUrl()).eql("http://localhost:3000/");

    const uid = await getLocalStorageItem("uid");
    await t.expect(uid).ok();

    const access = await getLocalStorageItem("accessToken");
    await t.expect(access).ok();

    const refresh = await getLocalStorageItem("refreshToken");
    await t.expect(refresh).ok();
});

test("Shouldn't signup user with emplty fields", async (t) => {
    //* Act
    await t.click('[data-test="confirm"]');

    //* Assert
    await t.expect(Selector("span.sc-AxiKw").count).eql(5);
});


