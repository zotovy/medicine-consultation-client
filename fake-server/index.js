//! This server will used to superseed real server. It's like a mock
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

const sampleUser = {
    id: "123456789101",
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

//* ANCHOR: Users
app.post("/api/login-user", (req, res) => {
    if (req.body.email.includes("wrong")) {
        return res.status(202).json({
            success: false,
            error: "invalid_email",
            message: "invalid email",
        });
    }

    if (req.body.password.includes("wrong")) {
        return res.status(202).json({
            success: false,
            error: "invalid_password",
            message: "invalid password",
        });
    }

    return res.status(202).json({
        success: true,
        id: "123456789101",
        tokens: {
            access: "encoded-access-token",
            refresh: "encoded-refresh-token",
        },
    });
});

app.get("/api/user/:id", (req, res) => {
    if (req.params.id === "wrong") {
        return res.status(404).json({
            success: false,
            error: "no_user_found_error",
            message: `No user found`,
        });
    }

    return res.status(200).json({
        success: true,
        user: sampleUser,
    });
});

app.listen(5000, () => console.log("fake server have been started"));
