import axios from "axios";

process.env.TEST_SERVER_URL = "http://localhost:5000";

export const createUser = async (user: UserType) => {
    return await axios
        .post(process.env.TEST_SERVER_URL + "/api/user", user)
        .then((data) => data.data)
        .catch((e) => console.log(e.response));
};

export const clearFakeServerUserStorage = async () => {
    return await axios
        .post(process.env.TEST_SERVER_URL + "/fake/remove-users")
        .then((data) => data.data)
        .catch((e) => console.log(e.response));
};

export const clearFakeServerTokensStorage = async () => {
    return await axios
        .post(process.env.TEST_SERVER_URL + "/fake/remove-tokens")
        .then((data) => data.data)
        .catch((e) => console.log(e.response));
};

export const getUsers = async (i: number = 0) => {
    return (
        await axios
            .get(process.env.TEST_SERVER_URL + `/api/users`)
            .then((data) => data.data)
            .catch((e) => console.log(e.response))
    )[i];
};
