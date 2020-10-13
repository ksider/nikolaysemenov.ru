"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var Size;
(function (Size) {
    Size[Size["XS"] = 0] = "XS";
    Size[Size["S"] = 1] = "S";
    Size[Size["M"] = 2] = "M";
    Size[Size["L"] = 3] = "L";
    Size[Size["XL"] = 4] = "XL";
})(Size = exports.Size || (exports.Size = {}));
var StyledSpace = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\tdisplay: block;\n\n\t", ";\n"], ["\n\tdisplay: block;\n\n\t",
    ";\n"])), function (props) {
    switch (props.size) {
        case Size.XS:
            return styled_components_1.css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\theight: 8px;\n\t\t\t\t\twidth: 8px;\n\t\t\t\t"], ["\n\t\t\t\t\theight: 8px;\n\t\t\t\t\twidth: 8px;\n\t\t\t\t"])));
        case Size.S:
            return styled_components_1.css(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\theight: 16px;\n\t\t\t\t\twidth: 16px;\n\t\t\t\t"], ["\n\t\t\t\t\theight: 16px;\n\t\t\t\t\twidth: 16px;\n\t\t\t\t"])));
        case Size.M:
        default:
            return styled_components_1.css(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\theight: 32px;\n\t\t\t\t\twidth: 32px;\n\t\t\t\t"], ["\n\t\t\t\t\theight: 32px;\n\t\t\t\t\twidth: 32px;\n\t\t\t\t"])));
        case Size.L:
            return styled_components_1.css(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\theight: 64px;\n\t\t\t\t\twidth: 64px;\n\t\t\t\t"], ["\n\t\t\t\t\theight: 64px;\n\t\t\t\t\twidth: 64px;\n\t\t\t\t"])));
        case Size.XL:
            return styled_components_1.css(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\theight: 128px;\n\t\t\t\t\twidth: 128px;\n\t\t\t\t"], ["\n\t\t\t\t\theight: 128px;\n\t\t\t\t\twidth: 128px;\n\t\t\t\t"])));
    }
});
var Space = function (props) {
    return React.createElement(StyledSpace, { size: props.size });
};
exports.default = Space;
var templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_1;
//# sourceMappingURL=index.js.map