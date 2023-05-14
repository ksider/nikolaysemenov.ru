/// <reference types="react" />
import * as React from "react";
export interface DropdownDemoState {
    dropdownOpen: boolean;
}
export default class DropdownDemo extends React.Component<null, DropdownDemoState> {
    constructor();
    render(): JSX.Element;
    protected handleClick: () => void;
    protected handleDropdownToggle(): void;
}
