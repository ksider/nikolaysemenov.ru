/// <reference types="react" />
import * as React from "react";
/**
 * @name Button
 */
export interface ButtonProps {
    /** @name Disabled @default false */ disabled?: boolean;
    /** @name Primary @default true */ primary?: boolean;
    /** @name Text @default Click me! */ text?: string;
    /** @hidden */ onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /** @hidden */ onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
}
declare const Button: React.StatelessComponent<ButtonProps>;
export default Button;
