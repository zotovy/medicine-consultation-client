"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./static/index.css");
var menu_1 = require("./modules/doctors/components/menu");
// import SandBox from "./sandbox";
require('dotenv').config();
var MainPage = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/main"); }); });
var Signup = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/auth"); }).then(function (module) { return ({ "default": module.Signup }); }); });
var Login = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/auth"); }).then(function (module) { return ({ "default": module.Login }); }); });
var DoctorSignUp = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/auth"); }).then(function (module) { return ({ "default": module.DoctorSignUp }); }); });
var ResetPasswordFromEmail = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/auth"); }).then(function (module) { return ({ "default": module.ResetPasswordFromEmail }); }); });
var ResetPassword = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/auth"); }).then(function (module) { return ({ "default": module.ResetPassword }); }); });
var FindDoctor = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/doctors"); }).then(function (module) { return ({ "default": module.ChooseDoctor }); }); });
var FilterCityModal = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/doctors"); }).then(function (module) { return ({ "default": module.FilterCityModal }); }); });
var DetailDoctorPage = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/doctors"); }).then(function (module) { return ({ "default": module.DetailDoctorPage }); }); });
var SymptomsPage = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/doctors"); }).then(function (module) { return ({ "default": module.SymptomsPage }); }); });
var AppointmentPage = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/consultations"); }).then(function (module) { return ({ "default": module.AppointmentPage }); }); });
var ConsultationPage = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/consultations"); }).then(function (module) { return ({ "default": module.ConsultationPage }); }); });
var ErrorPage = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/other/pages/error"); }); });
var Admin = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/admin"); }); });
var AdminLogin = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/admin"); }).then(function (module) { return ({ "default": module.Login }); }); });
var ErrorSympPage = react_1.lazy(function () { return Promise.resolve().then(function () { return require("./modules/doctors/components/symptoms/error-page"); }); });
var App = function () {
    return (react_1["default"].createElement(react_router_dom_1.Switch, null,
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", exact: true },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(Login, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/signup", exact: true },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(Signup, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/doctor-signup", exact: true },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(DoctorSignUp, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/reset-password-from-email", exact: true },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(ResetPasswordFromEmail, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/reset-password/:id", exact: true },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(ResetPassword, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/find-doctor", exact: true },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(FilterCityModal, null)),
            react_1["default"].createElement("div", { className: "doctor-module" },
                react_1["default"].createElement(menu_1["default"], null),
                react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                    react_1["default"].createElement(FindDoctor, null)))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/doctor/:id", exact: true },
            react_1["default"].createElement(menu_1["default"], null),
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(DetailDoctorPage, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/sympthoms", exact: true },
            react_1["default"].createElement(menu_1["default"], null),
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(SymptomsPage, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/appoint", exact: true },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(AppointmentPage, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/consultation/:id", exact: true },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(ConsultationPage, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/", exact: true },
            react_1["default"].createElement(menu_1["default"], null),
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(MainPage, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/symp-error" },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(ErrorSympPage, null))),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/admin-login", exact: true },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(AdminLogin, null))),
        ";",
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/error" },
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
                react_1["default"].createElement(ErrorPage, null))),
        react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1["default"].Fragment, null) },
            react_1["default"].createElement(Admin, null))));
};
exports["default"] = App;
