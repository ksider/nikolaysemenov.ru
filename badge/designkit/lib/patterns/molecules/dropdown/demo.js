"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var icons_1 = require("../../atoms/icons");
var dropdown_item_1 = require("../../atoms/dropdown-item");
var index_1 = require("./index");
var DropdownDemo = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownDemo, _super);
    function DropdownDemo() {
        var _this = _super.call(this) || this;
        _this.handleClick = function () {
            console.log("dropdown click handler");
        };
        _this.state = { dropdownOpen: false };
        _this.handleDropdownToggle = _this.handleDropdownToggle.bind(_this);
        return _this;
    }
    DropdownDemo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(index_1.default, { onToggle: this.handleDropdownToggle, open: this.state.dropdownOpen, text: "Dropdown" },
                React.createElement(dropdown_item_1.default, { content: 'Item' }),
                React.createElement(dropdown_item_1.default, { content: 'Item' }),
                React.createElement(dropdown_item_1.default, { content: 'Item' })),
            React.createElement(index_1.default, { onToggle: this.handleDropdownToggle, open: true, text: "Dropdown" },
                React.createElement(dropdown_item_1.default, { content: 'Option 1' }),
                React.createElement(dropdown_item_1.default, { content: 'Option 2' }),
                React.createElement(dropdown_item_1.default, { content: 'Option 3' })),
            React.createElement(icons_1.IconRegistry, { names: icons_1.IconName })));
    };
    DropdownDemo.prototype.handleDropdownToggle = function () {
        this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { dropdownOpen: !prevState.dropdownOpen })); });
    };
    return DropdownDemo;
}(React.Component));
exports.default = DropdownDemo;
//# sourceMappingURL=demo.js.map