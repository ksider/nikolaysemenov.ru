"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var colors_1 = require("../colors");
var fonts_1 = require("../fonts");
var StyledButton = styled_components_1.default.button(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\tpadding: 15px 30px;\n\tmin-width: 200px;\n\tfont-size: 18px;\n\tfont-family: ", ";\n\tborder-radius: 3px;\n\n\t", "} ", ";\n"], ["\n\tpadding: 15px 30px;\n\tmin-width: 200px;\n\tfont-size: 18px;\n\tfont-family: ", ";\n\tborder-radius: 3px;\n\n\t",
    "} ",
    ";\n"])), fonts_1.fonts().NORMAL_FONT, function (props) {
    if (props.primary) {
        return styled_components_1.css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\t\t\t\tbackground: ", ";\n\t\t\t\tborder: 1px solid ", ";\n\t\t\t\tcolor: ", ";\n\t\t\t\t&:hover {\n\t\t\t\t\tbackground-color: ", ";\n\t\t\t\t\tborder-color: ", ";\n\t\t\t\t}\n\t\t\t\t&:disabled {\n\t\t\t\t\tborder-color: ", ";\n\t\t\t\t\tbackground-color: ", ";\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tbackground: ", ";\n\t\t\t\tborder: 1px solid ", ";\n\t\t\t\tcolor: ", ";\n\t\t\t\t&:hover {\n\t\t\t\t\tbackground-color: ", ";\n\t\t\t\t\tborder-color: ", ";\n\t\t\t\t}\n\t\t\t\t&:disabled {\n\t\t\t\t\tborder-color: ", ";\n\t\t\t\t\tbackground-color: ", ";\n\t\t\t\t}\n\t\t\t"])), colors_1.default.green.toString(), colors_1.default.greenDark.toString(), colors_1.default.white.toString(), colors_1.default.greenLight.toString(), colors_1.default.green.toString(), colors_1.default.grey70.toString(), colors_1.default.grey70.toString());
    }
    else {
        return styled_components_1.css(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n\t\t\t\tbackground: ", ";\n\t\t\t\tborder: 1px solid ", ";\n\t\t\t\tcolor: ", ";\n\t\t\t\t&:hover {\n\t\t\t\t\tborder-color: ", ";\n\t\t\t\t\tcolor: ", ";\n\t\t\t\t}\n\t\t\t\t&:disabled {\n\t\t\t\t\tborder-color: ", ";\n\t\t\t\t\tcolor: ", ";\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tbackground: ", ";\n\t\t\t\tborder: 1px solid ", ";\n\t\t\t\tcolor: ", ";\n\t\t\t\t&:hover {\n\t\t\t\t\tborder-color: ", ";\n\t\t\t\t\tcolor: ", ";\n\t\t\t\t}\n\t\t\t\t&:disabled {\n\t\t\t\t\tborder-color: ", ";\n\t\t\t\t\tcolor: ", ";\n\t\t\t\t}\n\t\t\t"])), colors_1.default.white.toString(), colors_1.default.green.toString(), colors_1.default.green.toString(), colors_1.default.greenLight.toString(), colors_1.default.greenLight.toString(), colors_1.default.grey70.toString(), colors_1.default.grey70.toString());
    }
}, function (props) {
    return (props.onClick || props.onMouseDown) && !props.disabled
        ? styled_components_1.css(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t"], ["\n\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t"]))) : "";
});
var Button = function (props) {
    return React.createElement(StyledButton, tslib_1.__assign({}, props),
        props.text,
        props.children);
};
exports.default = Button;
var templateObject_2, templateObject_3, templateObject_4, templateObject_1;
//# sourceMappingURL=index.js.map