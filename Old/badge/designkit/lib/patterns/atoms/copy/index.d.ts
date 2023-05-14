/// <reference types="react" />
import * as React from "react";
export interface CopyProps {
    /** @name CSS Class @hidden */ className?: string;
    /** @name Copy Size @default Medium */ size?: Size;
    /** @name Tag name @hidden */ tagName?: string;
    /** @name Text Align @default Left */ textAlign?: TextAlign;
    /** @name Text @default Enter some text */ text?: string;
    /** @name Color @default #000000 */ color?: string;
}
export declare enum Size {
    Small = 0,
    Medium = 1,
}
export declare enum TextAlign {
    Left = 0,
    Center = 1,
    Right = 2,
}
declare const Copy: React.StatelessComponent<CopyProps>;
export default Copy;
