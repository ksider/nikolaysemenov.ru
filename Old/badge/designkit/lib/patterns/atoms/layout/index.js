"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var Direction;
(function (Direction) {
    /** @name horizontal */ Direction[Direction["HORIZONTAL"] = 0] = "HORIZONTAL";
    /** @name vertical */ Direction[Direction["VERTICAL"] = 1] = "VERTICAL";
})(Direction = exports.Direction || (exports.Direction = {}));
var StyledLayout = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\tdisplay: flex;\n\tmargin: 0 auto;\n\twidth: 100%;\n\tmax-width: ", ";\n\tbackground-color: ", ";\n\n\t", ";\n"], ["\n\tdisplay: flex;\n\tmargin: 0 auto;\n\twidth: 100%;\n\tmax-width: ", ";\n\tbackground-color: ", ";\n\n\t",
    ";\n"])), function (props) { return props.maxWidth || "none"; }, function (props) { return props.backgroundColor || "none"; }, function (props) {
    console.log("layout got " + props.direction);
    console.log("expecting " + Direction.HORIZONTAL);
    console.log("or " + Direction.VERTICAL);
    switch (props.direction) {
        case Direction.HORIZONTAL:
            return styled_components_1.css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\tflex-direction: row;\n\t\t\t\t"], ["\n\t\t\t\t\tflex-direction: row;\n\t\t\t\t"])));
        case Direction.VERTICAL:
        default:
            return styled_components_1.css(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\tflex-direction: column;\n\t\t\t\t"], ["\n\t\t\t\t\tflex-direction: column;\n\t\t\t\t"])));
    }
});
var Layout = function (props) {
    return React.createElement(StyledLayout, tslib_1.__assign({}, props), props.children);
};
exports.default = Layout;
var templateObject_2, templateObject_3, templateObject_1;
//# sourceMappingURL=index.js.map