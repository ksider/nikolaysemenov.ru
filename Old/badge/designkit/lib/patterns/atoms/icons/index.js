"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var IconName;
(function (IconName) {
    IconName[IconName["ArrowDown"] = 0] = "ArrowDown";
})(IconName = exports.IconName || (exports.IconName = {}));
var IconSize;
(function (IconSize) {
    IconSize[IconSize["XS"] = 24] = "XS";
    IconSize[IconSize["S"] = 30] = "S";
    IconSize[IconSize["M"] = 48] = "M";
    IconSize[IconSize["L"] = 52] = "L";
})(IconSize = exports.IconSize || (exports.IconSize = {}));
var icons = (_a = {},
    _a[IconName.ArrowDown] = [
        [React.createElement("path", { key: "arrow-down", d: "M12 15.5l6.06217783-7H5.93782217" })],
        [React.createElement("path", { key: "arrow-down", d: "M24 31l12.12435565-14h-24.2487113" })]
    ],
    _a);
var StyledIconRegistry = styled_components_1.default.svg(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\tdisplay: none;\n"], ["\n\tdisplay: none;\n"])));
var StyledIcon = styled_components_1.default.svg(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\twidth: ", "px;\n\theight: ", "px;\n\n\tcolor: ", ";\n\tfill: currentColor;\n\tstroke: none;\n"], ["\n\twidth: ", "px;\n\theight: ", "px;\n\n\tcolor: ", ";\n\tfill: currentColor;\n\tstroke: none;\n"])), function (props) { return props.size || IconSize.S; }, function (props) { return props.size || IconSize.S; }, function (props) { return (props.iconColor ? props.iconColor.toString() : "inherit"); });
var IconRegistrySymbol = function (props) {
    return (React.createElement("symbol", { id: props.id + "-" + props.size, viewBox: props.size === "small" ? "0 0 24 24" : "0 0 48 48" }, props.children));
};
exports.IconRegistry = function (props) {
    return (React.createElement(StyledIconRegistry, null, reduce(props.names, function (name, e) {
        var _a = icons[e], small = _a[0], large = _a[1];
        return [
            React.createElement(IconRegistrySymbol, { id: name, key: name + "-small", size: "small" }, small),
            React.createElement(IconRegistrySymbol, { id: name, key: name + "-large", size: "large" }, large || small)
        ];
    })));
};
function getIconRef(name, size) {
    switch (size) {
        case IconSize.XS:
        case IconSize.S:
            return "#" + name + "-small";
        case IconSize.M:
        case IconSize.L:
        default:
            return "#" + name + "-large";
    }
}
exports.Icon = function (props) {
    var icon = typeof props.name === "number" ? IconName[props.name] : null;
    return (React.createElement(StyledIcon, { className: props.className, iconColor: props.color, size: props.size }, icon !== null && React.createElement("use", { xlinkHref: getIconRef(icon, props.size || IconSize.S) })));
};
function reduce(e, cb) {
    var results = [];
    for (var n in e) {
        if (isNaN(Number(n))) {
            results.push.apply(results, cb(n, Number(e[n])));
        }
    }
    return results;
}
exports.reduce = reduce;
var templateObject_1, templateObject_2;
var _a;
//# sourceMappingURL=index.js.map