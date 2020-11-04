"use strict";
exports.__esModule = true;
var react_1 = require("react");
var doctor_slide_1 = require("./doctor-slide");
var mobx_react_1 = require("mobx-react");
var symptoms_slider_controller_1 = require("../../controllers/symptoms-slider-controller");
var confirm_button_1 = require("../../../../components/confirm-button");
var detail_controller_1 = require("../../controllers/detail-controller");
var react_router_dom_1 = require("react-router-dom");
<<<<<<< Updated upstream
=======
var react_router_dom_2 = require("react-router-dom");
var symptoms_controller_1 = require("../../controllers/symptoms-controller");
>>>>>>> Stashed changes
var Slider = function () {
    var highlightSlideId = symptoms_slider_controller_1["default"].highlightSlideId, prevNextButsController = symptoms_slider_controller_1["default"].prevNextButsController, slideShift = symptoms_slider_controller_1["default"].slideShift, currentSlide = symptoms_slider_controller_1["default"].currentSlide;
    var doctors = symptoms_controller_1["default"].doctors;
    var goToDoctorPage = function () {
        detail_controller_1["default"].fetchDoctor(highlightSlideId);
        history.push("/doctor/" + highlightSlideId);
    };
    var history = react_router_dom_1.useHistory();
    console.log(doctors.length);
    return (react_1["default"].createElement("div", { className: "slider-container" },
        react_1["default"].createElement("div", { className: "slider-wrapper", style: { transform: "translate3d(-" + slideShift + "px, 0px, 0px)", transition: "all 300ms ease 0s" } },
            doctors.map(function (e) { var _a, _b, _c, _d; return react_1["default"].createElement(doctor_slide_1["default"], { id: (_a = e.id) !== null && _a !== void 0 ? _a : "", name: (_b = e.name) !== null && _b !== void 0 ? _b : "", surname: (_c = e.surname) !== null && _c !== void 0 ? _c : "", imgUrl: (_d = e.photoUrl) !== null && _d !== void 0 ? _d : "", rating: e.rating, speciality: e.speciality[0] }); }),
            react_1["default"].createElement("div", { className: "slider-slide slider-show-more-but" },
                react_1["default"].createElement("div", { className: "doctor_profile_pic show-more-pic" },
                    react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "74.731", height: "74.731", viewBox: "0 0 74.731 74.731" },
                        react_1["default"].createElement("g", { id: "\u0421\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C_179", "data-name": "\u0421\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C 179", transform: "translate(-1037.887 -487)" },
                            react_1["default"].createElement("g", { id: "Icon_feather-search", "data-name": "Icon feather-search", transform: "translate(914.383 475.496)" },
                                react_1["default"].createElement("path", { id: "\u041A\u043E\u043D\u0442\u0443\u0440_115", "data-name": "\u041A\u043E\u043D\u0442\u0443\u0440 115", d: "M62.988,34.244A29.5,29.5,0,0,1,33.744,63.988,29.5,29.5,0,0,1,4.5,34.244,29.5,29.5,0,0,1,33.744,4.5,29.5,29.5,0,0,1,62.988,34.244Z", transform: "translate(122.004 10.004)", fill: "none", stroke: "#30b9d6", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "6" }),
                                react_1["default"].createElement("path", { id: "\u041A\u043E\u043D\u0442\u0443\u0440_116", "data-name": "\u041A\u043E\u043D\u0442\u0443\u0440 116", d: "M41.463,41.463,24.975,24.975", transform: "translate(152.529 40.529)", fill: "none", stroke: "#30b9d6", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "6" })),
                            react_1["default"].createElement("rect", { id: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A_287", "data-name": "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A 287", width: "9", height: "26", rx: "2", transform: "translate(1066 507)", fill: "#30b9d6" }),
                            react_1["default"].createElement("rect", { id: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A_288", "data-name": "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A 288", width: "26", height: "8", rx: "2", transform: "translate(1057 516)", fill: "#30b9d6" })))),
                react_1["default"].createElement("div", { className: "info info--show-more-but" },
                    react_1["default"].createElement("h3", { className: "name-and-surname name-and-surname--show-more-but" }, "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435")))),
        react_1["default"].createElement("div", { className: "slider-control" },
            react_1["default"].createElement("div", { className: "slider-control-wrapper slider-control-wrapper-left " + (highlightSlideId !== "" ? "control-left" : '') },
                react_1["default"].createElement("div", { className: (currentSlide !== 1 ? "" : "disactive") + " slider-button slider-button-prev", onClick: function () { prevNextButsController("prev"); } },
                    react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "19.828", height: "35.657", viewBox: "0 0 19.828 35.657" },
                        react_1["default"].createElement("path", { id: "Icon_feather-chevron-right", "data-name": "Icon feather-chevron-right", d: "M28.5,39l-15-15,8.125-8.125L28.5,9", transform: "translate(-11.5 -6.172)", fill: "none", stroke: "#30b9d6", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "4" })))),
            react_1["default"].createElement("div", { className: "slider-control-wrapper slider-control-wrapper-spb" },
                react_1["default"].createElement("div", { className: "slider-show-profile-but", onClick: function () { goToDoctorPage(); } },
                    react_1["default"].createElement("h3", null, "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u041F\u0440\u043E\u0444\u0438\u043B\u044C"))),
            react_1["default"].createElement("div", { className: "slider-control-wrapper slider-control-wrapper-cBut" },
                react_1["default"].createElement(confirm_button_1["default"], { content: '\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C', onConfirm: function () { } })),
            react_1["default"].createElement("div", { className: "slider-control-wrapper slider-control-wrapper-right " + (highlightSlideId !== "" ? "control-right" : '') },
                react_1["default"].createElement("div", { className: (currentSlide !== Math.round(doctors.length / 4) ? "" : "disactive") + " slider-button slider-button-next", onClick: function () { prevNextButsController("next"); } },
                    react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "19.828", height: "35.657", viewBox: "0 0 19.828 35.657" },
                        react_1["default"].createElement("path", { id: "Icon_feather-chevron-right", "data-name": "Icon feather-chevron-right", d: "M13.5,39l15-15L13.5,9", transform: "translate(-10.672 -6.172)", fill: "none", stroke: "#30b9d6", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "4" })))))));
};
exports["default"] = mobx_react_1.observer(Slider);