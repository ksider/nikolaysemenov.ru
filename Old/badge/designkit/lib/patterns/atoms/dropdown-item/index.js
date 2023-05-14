"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var colors_1 = require("../colors");
var fonts_1 = require("../fonts");
var StyledDropdownItem = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\tdisplay: flex;\n\tpadding: 17px 22px;\n\tborder-top: 1px solid ", ";\n\tfont-family: ", ";\n\n\t&:hover {\n\t\tcolor: ", ";\n\t}\n"], ["\n\tdisplay: flex;\n\tpadding: 17px 22px;\n\tborder-top: 1px solid ", ";\n\tfont-family: ", ";\n\n\t&:hover {\n\t\tcolor: ", ";\n\t}\n"])), colors_1.default.grey70.toString(), fonts_1.fonts().NORMAL_FONT, colors_1.default.black.toString());
var DropdownItem = function (props) {
    return React.createElement(StyledDropdownItem, null, props.content);
};
exports.default = DropdownItem;
var templateObject_1;
//# sourceMappingURL=index.js.map