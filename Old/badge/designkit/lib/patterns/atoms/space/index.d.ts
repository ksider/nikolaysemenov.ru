/// <reference types="react" />
import * as React from "react";
export interface SpaceProps {
    /** @name Size @default M */ size?: Size;
}
export declare enum Size {
    XS = 0,
    S = 1,
    M = 2,
    L = 3,
    XL = 4,
}
declare const Space: React.StatelessComponent<SpaceProps>;
export default Space;
