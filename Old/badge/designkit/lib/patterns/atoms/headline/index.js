"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var fonts_1 = require("../fonts");
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
var StyledHeadline = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\tmargin-top: 0;\n\tfont-family: ", ";\n\tfont-weight: 500;\n\tcolor: ", ";\n\n\t", ";\n\n\t", ";\n"], ["\n\tmargin-top: 0;\n\tfont-family: ", ";\n\tfont-weight: 500;\n\tcolor: ", ";\n\n\t",
    ";\n\n\t",
    ";\n"])), fonts_1.fonts().NORMAL_FONT, function (props) { return props.color || "none"; }, function (props) {
    switch (props.level) {
        case Level.H3:
            return styled_components_1.css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\tfont-size: 24px;\n\t\t\t\t\tline-height: 30px;\n\t\t\t\t"], ["\n\t\t\t\t\tfont-size: 24px;\n\t\t\t\t\tline-height: 30px;\n\t\t\t\t"])));
        case Level.H2:
            return styled_components_1.css(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\tfont-size: 38px;\n\t\t\t\t\tline-height: 45px;\n\t\t\t\t"], ["\n\t\t\t\t\tfont-size: 38px;\n\t\t\t\t\tline-height: 45px;\n\t\t\t\t"])));
        case Level.H1:
        default:
            return styled_components_1.css(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\tfont-size: 52px;\n\t\t\t\t\tline-height: 60px;\n\t\t\t\t\tfont-weight: 700;\n\t\t\t\t"], ["\n\t\t\t\t\tfont-size: 52px;\n\t\t\t\t\tline-height: 60px;\n\t\t\t\t\tfont-weight: 700;\n\t\t\t\t"])));
    }
}, function (props) {
    switch (props.textAlign) {
        case TextAlign.Center:
            return styled_components_1.css(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\ttext-align: center;\n\t\t\t\t"], ["\n\t\t\t\t\ttext-align: center;\n\t\t\t\t"])));
        case TextAlign.Right:
            return styled_components_1.css(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\ttext-align: right;\n\t\t\t\t"], ["\n\t\t\t\t\ttext-align: right;\n\t\t\t\t"])));
        case TextAlign.Left:
            return styled_components_1.css(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\ttext-align: left;\n\t\t\t\t"], ["\n\t\t\t\t\ttext-align: left;\n\t\t\t\t"])));
        default:
            return styled_components_1.css(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\ttext-align: inherit;\n\t\t\t\t"], ["\n\t\t\t\t\ttext-align: inherit;\n\t\t\t\t"])));
    }
});
var Headline = function (props) {
    var tagName = "h1";
    switch (props.level) {
        case Level.H3:
            tagName = "h3";
            break;
        case Level.H2:
            tagName = "h2";
            break;
        case Level.H1:
            tagName = "h1";
            break;
    }
    var Component = StyledHeadline.withComponent(tagName);
    return (React.createElement(Component, tslib_1.__assign({}, props),
        props.text,
        props.children));
};
exports.default = Headline;
var templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_1;
//# sourceMappingURL=index.js.map