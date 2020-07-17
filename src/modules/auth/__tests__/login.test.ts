import { Selector, ClientFunction } from "testcafe";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Types
import UserObject from "../../../types/user";

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
const sampleUser: UserObject = {
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

fixture("Login page tests")
    .page("http://localhost:3000/login")
    .afterEach(async (t) => {
        await ClientFunction(() => localStorage.clear())();
    });

const getLocalStorageItem = ClientFunction((prop) => {
    return localStorage.getItem(prop);
});

// ANCHOR: should login user
/**  Should find & successfully interact with email & password fileds */
test("should login user", async (browser) => {
    //* Act
    const ErrorText = await Selector(".hGpYGG");

    await browser
        .typeText("#email", sampleUser.email ?? "")
        .typeText("#password", sampleUser.password ?? "")
        .click(".dYHvuX");

    //* Checking
    await browser.expect(ErrorText.exists).notOk();
    const url = await ClientFunction(() => window.location.href)();
    await browser.expect(url).eql("http://localhost:3000/");

    const uid = await getLocalStorageItem("uid");
    await browser.expect(uid).eql("123456789101");

    const refresh = await getLocalStorageItem("refreshToken");
    await browser.expect(refresh).eql("encoded-refresh-token");

    const access = await getLocalStorageItem("accessToken");
    await browser.expect(access).eql("encoded-access-token");

    const UserInfo = await Selector(".auth span");
    await browser
        .expect(await UserInfo.textContent)
        .eql("Account: Иван Иванов");
});

// ANCHOR: shouldn't login user on incorrect email
/** Pass incorrect formatted email. Clientshouldn't login */
test("shouldn't login user on incorrect email", async (browser) => {
    //* Act
    const ErrorText = await Selector(".hGpYGG");

    await browser
        .typeText("#email", "123")
        .typeText("#password", sampleUser.password ?? "")
        .click(".dYHvuX");

    //* Checking
    await browser
        .expect(ErrorText.textContent)
        .eql("Неверный email или пароль");
    const url = await ClientFunction(() => window.location.href)();
    await browser.expect(url).eql("http://localhost:3000/login");

    const uid = await getLocalStorageItem("uid");
    await browser.expect(uid).eql(null);

    const refresh = await getLocalStorageItem("refreshToken");
    await browser.expect(refresh).eql(null);

    const access = await getLocalStorageItem("accessToken");
    await browser.expect(access).eql(null);
});

// ANCHOR: shouldn't login user on incorrect password
/** Pass empty password. Client shouldn't login */
test("shouldn't login user on incorrect password", async (browser) => {
    //* Act
    const ErrorText = await Selector(".hGpYGG");

    await browser
        .typeText("#email", sampleUser.email ?? "")
        .typeText("#password", "123")
        .click(".dYHvuX");

    //* Checking
    await browser
        .expect(ErrorText.textContent)
        .eql("Неверный email или пароль");
    const url = await ClientFunction(() => window.location.href)();
    await browser.expect(url).eql("http://localhost:3000/login");

    const uid = await getLocalStorageItem("uid");
    await browser.expect(uid).eql(null);

    const refresh = await getLocalStorageItem("refreshToken");
    await browser.expect(refresh).eql(null);

    const access = await getLocalStorageItem("accessToken");
    await browser.expect(access).eql(null);
});

// ANCHOR: shouldn't login on incorrect data provides API
/** Pass incorrect. Client shouldn't login */
test("shouldn't login on incorrect data provides API", async (browser) => {
    const ErrorText = await Selector(".hGpYGG");

    await browser
        .typeText("#email", "wrong@mail.com")
        .typeText("#password", "wrongpassword123")
        .click(".dYHvuX");

    //* Checking
    await browser
        .expect(ErrorText.textContent)
        .eql("Неверный email или пароль");
    const url = await ClientFunction(() => window.location.href)();
    await browser.expect(url).eql("http://localhost:3000/login");

    const uid = await getLocalStorageItem("uid");
    await browser.expect(uid).eql(null);

    const refresh = await getLocalStorageItem("refreshToken");
    await browser.expect(refresh).eql(null);

    const access = await getLocalStorageItem("accessToken");
    await browser.expect(access).eql(null);
});

// ANCHOR: should showPasswordIcon work
/** First time type of input should be "password". After that click on show password button. Now type of input should be "text" */
test("should showPasswordIcon work", async (browser) => {
    const input = await Selector("#password");

    await browser.typeText("#password", "testing!");

    const before = await input.getAttribute("type");
    await browser.click("#show-password-button");
    const after = await input.getAttribute("type");

    //* Checking
    await browser.expect(before).eql("password");
    await browser.expect(after).eql("text");
});
