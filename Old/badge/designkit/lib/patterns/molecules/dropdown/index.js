"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var colors_1 = require("../../atoms/colors");
var fonts_1 = require("../../atoms/fonts");
var icons_1 = require("../../atoms/icons");
var StyledDropdown = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\tbox-sizing: border-box;\n\twidth: 100%;\n\tmax-width: 400px;\n\tborder: 1px solid ", ";\n\tborder-radius: 3px;\n\tcursor: pointer;\n\tbackground: ", ";\n\tcolor: ", ";\n\tfont-family: ", ";\n\tfont-size: 16px;\n\tbox-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.25);\n"], ["\n\tbox-sizing: border-box;\n\twidth: 100%;\n\tmax-width: 400px;\n\tborder: 1px solid ", ";\n\tborder-radius: 3px;\n\tcursor: pointer;\n\tbackground: ", ";\n\tcolor: ", ";\n\tfont-family: ", ";\n\tfont-size: 16px;\n\tbox-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.25);\n"])), colors_1.default.grey70.toString(), colors_1.default.white.toString(), colors_1.default.grey70.toString(), fonts_1.fonts().NORMAL_FONT);
var StyledText = styled_components_1.default.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\tdisplay: flex;\n\tjustify-content: space-between;\n\talign-items: center;\n\tpadding: 13px 22px;\n"], ["\n\tdisplay: flex;\n\tjustify-content: space-between;\n\talign-items: center;\n\tpadding: 13px 22px;\n"])));
var StyledIcon = styled_components_1.default(icons_1.Icon)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n\tfill: ", ";\n\t", ";\n"], ["\n\tfill: ", ";\n\t",
    ";\n"])), colors_1.default.greenDark.toString(), function (props) {
    return props.open ? "transform: rotate(180deg);" : "transform: rotate(0deg);";
});
var StyledFlyout = styled_components_1.default.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n\t", " flex-basis: 100%;\n\tflex-direction: column;\n"], ["\n\t",
    " flex-basis: 100%;\n\tflex-direction: column;\n"])), function (props) {
    return props.open ? "display: flex;" : "display: none;";
});
var Dropdown = function (props) {
    return (React.createElement(StyledDropdown, { onClick: props.onToggle },
        React.createElement(StyledText, null,
            props.text,
            React.createElement(StyledIcon, { name: icons_1.IconName.ArrowDown, size: icons_1.IconSize.XS, open: props.open })),
        React.createElement(StyledFlyout, { open: props.open }, props.children)));
};
exports.default = Dropdown;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map