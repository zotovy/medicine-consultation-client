"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var mobx_react_1 = require("mobx-react");
var doctors_wrapper_1 = require("../components/doctors-wrapper");
var filter_1 = require("../components/filter");
var error_badge_1 = require("../../../components/error-badge");
var find_doctor_controller_1 = require("../controllers/find-doctor-controller");
var query_string_1 = require("query-string");
var FindDoctor = function () {
    var history = react_router_dom_1.useHistory();
    // Scroll component
    react_1.useEffect(function () {
        var _a;
        var q = ["fullName", "specialities", "child", "workExperience", "qualification", "workPlan", "city"];
        var config = {};
        var queries = query_string_1["default"].parse((_a = history.location.search) !== null && _a !== void 0 ? _a : "");
        q.forEach(function (e) {
            if (queries[e]) {
                // @ts-ignore
                config[e] = queries[e].split(",");
            }
        });
        try {
            if (queries['rating']) {
                config["rating"] = queries["rating"].split(",").map(function (e) { return parseInt(e); });
            }
        }
        catch (e) {
        }
        find_doctor_controller_1["default"].fetchDoctors(config);
        document.getElementsByClassName("doctor-module")[0].addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, []);
    function handleScroll() {
        var element = document.getElementsByClassName("doctor-module")[0];
        if (element.scrollHeight - element.scrollTop - 1 <= element.clientHeight) {
            find_doctor_controller_1["default"].loadNextPage();
        }
    }
    return react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(error_badge_1["default"], { isOpen: find_doctor_controller_1["default"].isErrorBadgeOpen, message: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043D\u0435\u043F\u0440\u0438\u0434\u0432\u0438\u0434\u0435\u043D\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430. \u041C\u044B \u0443\u0436\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043D\u0430\u0434 \u044D\u0442\u0438\u043C!" }),
        react_1["default"].createElement(filter_1["default"], null),
        react_1["default"].createElement(doctors_wrapper_1["default"], null));
};
exports["default"] = mobx_react_1.observer(FindDoctor);
