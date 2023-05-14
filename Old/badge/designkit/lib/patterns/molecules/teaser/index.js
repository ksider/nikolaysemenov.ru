"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var button_1 = require("../../atoms/button");
var colors_1 = require("../../atoms/colors");
var copy_1 = require("../../atoms/copy");
var headline_1 = require("../../atoms/headline");
var Level;
(function (Level) {
    Level[Level["H1"] = 0] = "H1";
    Level[Level["H2"] = 1] = "H2";
    Level[Level["H3"] = 2] = "H3";
})(Level = exports.Level || (exports.Level = {}));
var TextAlign;
(function (TextAlign) {
    TextAlign[TextAlign["Left"] = 0] = "Left";
    TextAlign[TextAlign["Center"] = 1] = "Center";
    TextAlign[TextAlign["Right"] = 2] = "Right";
})(TextAlign = exports.TextAlign || (exports.TextAlign = {}));
var StyledTeaser = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\tpadding: 30px;\n\tbackground: ", ";\n\tborder: 1px solid ", ";\n"], ["\n\tpadding: 30px;\n\tbackground: ", ";\n\tborder: 1px solid ", ";\n"])), colors_1.default.white.toString(), colors_1.default.grey90.toString());
var StyledHeadline = styled_components_1.default(headline_1.default)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\tmargin-bottom: 30px;\n"], ["\n\tmargin-bottom: 30px;\n"])));
var StyledCopy = styled_components_1.default(copy_1.default)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n\tmargin-bottom: 30px;\n"], ["\n\tmargin-bottom: 30px;\n"])));
var Teaser = function (props) {
    return (React.createElement(StyledTeaser, null,
        React.createElement(StyledHeadline, { level: props.headlineLevel }, props.headlineText),
        React.createElement(StyledCopy, { size: copy_1.Size.Medium }, props.copyText),
        React.createElement(button_1.default, { onClick: props.onClick, primary: true }, props.buttonLabel)));
};
exports.default = Teaser;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map