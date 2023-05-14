"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_1 = require("./index");
var HeadlineDemo = function () {
    return (React.createElement("div", null,
        React.createElement(index_1.default, { level: index_1.Level.H1 }, "Headline Order 1"),
        React.createElement(index_1.default, { level: index_1.Level.H2 }, "Headline Order 2"),
        React.createElement(index_1.default, { level: index_1.Level.H3 }, "Headline Order 3"),
        React.createElement(index_1.default, { level: index_1.Level.H3, textAlign: index_1.TextAlign.Center }, "Headline Order 3")));
};
exports.default = HeadlineDemo;
//# sourceMappingURL=demo.js.map