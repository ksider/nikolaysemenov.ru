"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var colors_1 = require("../../atoms/colors");
var copy_1 = require("../../atoms/copy");
var headline_1 = require("../../atoms/headline");
var StyledHero = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\tpadding: 30px;\n\tbackground: ", ";\n\tcolor: ", ";\n\ttext-align: center;\n"], ["\n\tpadding: 30px;\n\tbackground: ", ";\n\tcolor: ", ";\n\ttext-align: center;\n"])), colors_1.default.blue.toString(), colors_1.default.white.toString());
var Teaser = function (props) {
    return (React.createElement(StyledHero, null,
        React.createElement(headline_1.default, { level: props.headlineLevel, textAlign: props.headlineAlign }, props.headlineText),
        React.createElement(copy_1.default, { size: copy_1.Size.Medium }, props.copyText)));
};
exports.default = Teaser;
var templateObject_1;
//# sourceMappingURL=index.js.map