/// <reference path="../../src/@types/user.d.ts"/>

import { Selector, ClientFunction } from "testcafe";
import {
    getLocalStorageItem,
    clearLocalStorage,
} from "../helpers/localstorage";
import {
    createUser,
    clearFakeServerUserStorage,
    clearFakeServerTokensStorage,
} from "../helpers/auth";
// import fetch from "node-fetch";
// import axios from "axios";

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
    name: "Иван",
    surname: "Иванов",
    photoUrl: "",
    phone: 79028319028,
    email: "ivanov_ivan123@mail.ru",
    password: "ivanovcoolguy911",
    sex: true,
    city: "Москва",
    country: "Россия",
    consultations: [], // will add later
    reviews: [], // will add later
    notificationEmail: "ivanov_ivan123@mail.ru",
    sendNotificationToEmail: true,
    sendMailingsToEmail: true,
    createdAt: new Date(),
    lastActiveAt: new Date(),
    favourites: [],
};

fixture("Login page tests")
    .page("http://localhost:3000/login")
    .afterEach(async (t) => await clearLocalStorage())
    .after(async () => {
        await clearFakeServerUserStorage();
        await clearFakeServerTokensStorage();
    });

// ANCHOR: should login user
/**  Should find & successfully interact with email & password fileds */
test("should login user", async (browser) => {
    //* Arrange
    const created = await createUser(sampleUser);

    //* Act
    const ErrorText = Selector(".hGpYGG");

    await browser
        .typeText("#email", sampleUser.email ?? "")
        .typeText("#password", sampleUser.password ?? "")
        .click(".dYHvuX");

    //* Assert
    await browser.expect(ErrorText.exists).notOk();
    const url = await ClientFunction(() => window.location.href)();
    await browser.expect(url).eql("http://localhost:3000/");

    const uid = await getLocalStorageItem("uid");
    await browser.expect(uid).eql(created.user.id);

    const access = await getLocalStorageItem("accessToken");
    await browser.expect(access).ok();

    const refresh = await getLocalStorageItem("refreshToken");
    await browser.expect(refresh).ok();
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

    //* Assert
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

    //* Assert
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

    //* Assert
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

    //* Assert
    await browser.expect(before).eql("password");
    await browser.expect(after).eql("text");
});
