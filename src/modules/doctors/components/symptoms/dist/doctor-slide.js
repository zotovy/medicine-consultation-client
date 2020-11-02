"use strict";
exports.__esModule = true;
var react_1 = require("react");
var symptoms_slider_controller_1 = require("../../controllers/symptoms-slider-controller");
var mobx_react_1 = require("mobx-react");
var rating_1 = require("../rating");
var Slide = function (props) {
    var _a;
    var highlightSlideId = symptoms_slider_controller_1["default"].highlightSlideId, slideHandlerClick = symptoms_slider_controller_1["default"].slideHandlerClick;
    var img = (_a = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg") !== null && _a !== void 0 ? _a : props.imgUrl;
    return react_1["default"].createElement("div", { className: "slider-slide " + (props.id === highlightSlideId ? "active" : ""), onClick: function () { return slideHandlerClick(props.id); } },
        react_1["default"].createElement("div", { className: "doctor_profile_pic", style: { backgroundImage: "url(" + img + ")" } }),
        react_1["default"].createElement("div", { className: "info" },
            react_1["default"].createElement("h3", { className: "name-and-surname" },
                props.name,
                "\u00A0",
                props.surname),
            react_1["default"].createElement("h3", { className: "speciality" }, props.speciality ? props.speciality : ""),
            react_1["default"].createElement("div", { className: "rating" },
                react_1["default"].createElement(rating_1["default"], { amount: props.rating }))));
};
exports["default"] = mobx_react_1.observer(Slide);
