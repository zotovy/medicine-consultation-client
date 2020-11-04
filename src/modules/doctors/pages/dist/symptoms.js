"use strict";
exports.__esModule = true;
var react_1 = require("react");
var title_1 = require("../../../components/title");
var mobx_react_1 = require("mobx-react");
var tabs_1 = require("../components/symptoms/tabs");
var confirm_button_1 = require("../../../components/confirm-button");
var choice_1 = require("../components/symptoms/choice");
var error_badge_1 = require("../../../components/error-badge");
var symptoms_controller_1 = require("../controllers/symptoms-controller");
var doctors_1 = require("../components/symptoms/doctors");
var SymptomsPage = function () {
    var handlerClick = symptoms_controller_1["default"].handlerClick;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(error_badge_1["default"], { isOpen: symptoms_controller_1["default"].isErrorBadgeOpen, message: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043D\u0435\u043F\u0440\u0438\u0434\u0432\u0438\u0434\u0435\u043D\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430. \u041C\u044B \u0443\u0436\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043D\u0430\u0434 \u044D\u0442\u0438\u043C!" }),
        react_1["default"].createElement(error_badge_1["default"], { isOpen: symptoms_controller_1["default"].isErrorBadgeOpen, message: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0438\u043C\u043F\u0442\u043E\u043C\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0412\u0430\u0441 \u0431\u0435\u0441\u043F\u043E\u043A\u043E\u044F\u0442." }),
        symptoms_controller_1["default"].canFindDoctors === true
            ?
                react_1["default"].createElement(doctors_1["default"], null)
            :
                react_1["default"].createElement("div", { className: "symptoms-wrapper" },
                    react_1["default"].createElement(title_1["default"], { title: "\u0421\u0438\u043C\u043F\u0442\u043E\u043C\u044B", mark: "." }),
                    react_1["default"].createElement("h3", { className: "symptoms-subtitle" },
                        "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0438\u043C\u043F\u0442\u043E\u043C\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0412\u0430\u0441 \u0431\u0435\u0441\u043F\u043E\u043A\u043E\u044F\u0442.",
                        react_1["default"].createElement("br", null),
                        " \u041C\u044B \u043F\u043E\u043C\u043E\u0436\u0435\u043C \u043B\u0435\u0433\u043A\u043E \u0412\u0430\u043C \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C \u043D\u0443\u0436\u043D\u043E\u0433\u043E \u0432\u0440\u0430\u0447\u0430!"),
                    react_1["default"].createElement("div", { className: "symptoms-main-container" },
                        react_1["default"].createElement(tabs_1["default"], null),
                        react_1["default"].createElement(choice_1["default"], null)),
                    react_1["default"].createElement("div", { className: 'symptoms-but' },
                        react_1["default"].createElement(confirm_button_1["default"], { content: '\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C', onConfirm: function () { handlerClick(); } })))));
};
exports["default"] = mobx_react_1.observer(SymptomsPage);
