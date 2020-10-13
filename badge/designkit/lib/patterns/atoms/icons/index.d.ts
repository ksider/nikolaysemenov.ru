/// <reference types="react" />
import * as React from "react";
import { Color } from "../colors";
export declare enum IconName {
    ArrowDown = 0,
}
export interface IconRegistryProps {
    names: typeof IconName;
}
export interface IconProps {
    className?: string;
    color?: Color;
    name?: IconName;
    size?: IconSize;
}
export declare enum IconSize {
    XS = 24,
    S = 30,
    M = 48,
    L = 52,
}
export declare const IconRegistry: React.StatelessComponent<IconRegistryProps>;
export declare const Icon: React.StatelessComponent<IconProps>;
export declare function reduce(e: typeof IconName, cb: (name: string, e: number) => JSX.Element[]): JSX.Element[];
