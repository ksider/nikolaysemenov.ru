/// <reference types="react" />
import * as React from "react";
export interface DropdownProps {
    /** @name Open */ open: boolean;
    /** @name Text */ text: string;
    /** @hidden */ onToggle(event: React.MouseEvent<HTMLElement>): void;
}
declare const Dropdown: React.StatelessComponent<DropdownProps>;
export default Dropdown;
