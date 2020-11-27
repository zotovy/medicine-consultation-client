"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./styles/styles.scss");
var Title = function (props) {
    return (react_1["default"].createElement("div", { className: "title-wrap" },
        react_1["default"].createElement("h1", null,
            props.title,
            react_1["default"].createElement("span", null, props.mark))));
};
exports["default"] = Title;
