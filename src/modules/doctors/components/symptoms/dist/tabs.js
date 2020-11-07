"use strict";
exports.__esModule = true;
var react_1 = require("react");
var mobx_react_1 = require("mobx-react");
var symptoms_controller_1 = require("../../controllers/symptoms-controller");
var svg_symp_1 = require("../../svg-symp");
var SymptomsTabs = function () {
    var items = symptoms_controller_1["default"].items, openTab = symptoms_controller_1["default"].openTab;
    var Tabs = function (_a) {
        var items = _a.items;
        var TabContent = function () {
            return (react_1["default"].createElement("div", { className: "tab-content" },
                react_1["default"].createElement("div", { className: "tab-content-img-wrap" },
                    react_1["default"].createElement(Tab, null))));
        };
        var Tab = function () {
            var arrNum;
            if (items[0].active === true) {
                arrNum = items[0].sourseSvg;
            }
            else {
                arrNum = items[1].sourseSvg;
            }
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { className: 'fake-img img-1' }, arrNum[0] === 1 ? react_1["default"].createElement(svg_symp_1.MaleFront, null) : react_1["default"].createElement(svg_symp_1.FemaleFront, null)),
                react_1["default"].createElement("div", { className: 'fake-img img-2' }, arrNum[1] === 2 ? react_1["default"].createElement(svg_symp_1.MaleSide, null) : react_1["default"].createElement(svg_symp_1.FemaleSide, null))));
        };
        return (react_1["default"].createElement("div", { className: 'tabs-wrapper' },
            react_1["default"].createElement("div", { className: 'tabs-ui-container' },
                react_1["default"].createElement(TabContent, null),
                react_1["default"].createElement("ul", { className: "symptoms-tab" }, items.map(function (n, i) { return (react_1["default"].createElement("li", { key: n.id, className: "tab-links tab-" + n.id + " " + (n.active === true ? 'tab-active' : ''), onClick: function (e) { return openTab(n.id); }, "data-index": i }, n.title)); })))));
    };
    return react_1["default"].createElement(Tabs, { items: items });
};
exports["default"] = mobx_react_1.observer(SymptomsTabs);
