"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var headline_1 = require("../headline");
var index_1 = require("./index");
var StyledDemoIconList = styled_components_1.default.ul(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap: wrap;\n\tmargin-top: 20px;\n\tmargin-bottom: 20px;\n\tpadding-left: 0;\n\twidth: 100%;\n\tlist-style: none;\n"], ["\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap: wrap;\n\tmargin-top: 20px;\n\tmargin-bottom: 20px;\n\tpadding-left: 0;\n\twidth: 100%;\n\tlist-style: none;\n"])));
var StyledDemoListItem = styled_components_1.default.li(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\tmargin-top: 18px;\n\twidth: 20%;\n\tmin-width: 51px;\n\ttext-align: center;\n"], ["\n\tmargin-top: 18px;\n\twidth: 20%;\n\tmin-width: 51px;\n\ttext-align: center;\n"])));
var StyledIcon = styled_components_1.default(index_1.Icon)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n\tmargin-bottom: 9px;\n"], ["\n\tmargin-bottom: 9px;\n"])));
var DemoIcons = function (props) {
    return (React.createElement("div", null,
        React.createElement(headline_1.default, { level: headline_1.Level.H3 },
            "Icons ",
            index_1.IconSize[props.size]),
        React.createElement(StyledDemoIconList, null, index_1.reduce(props.names, function (name, id) { return [
            React.createElement(StyledDemoListItem, { key: name },
                React.createElement(StyledIcon, { name: id, size: props.size }))
        ]; }))));
};
var IconRegistryDemo = function () {
    return (React.createElement("div", null,
        React.createElement(DemoIcons, { size: index_1.IconSize.L, names: index_1.IconName }),
        React.createElement(DemoIcons, { size: index_1.IconSize.S, names: index_1.IconName }),
        React.createElement(index_1.IconRegistry, { names: index_1.IconName })));
};
exports.default = IconRegistryDemo;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=demo.js.map