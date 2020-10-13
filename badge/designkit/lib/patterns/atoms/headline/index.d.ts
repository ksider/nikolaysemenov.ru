/// <reference types="react" />
import * as React from "react";
export interface HeadlineProps {
    /** @name CSS class @hidden */ className?: string;
    /** @name Level @default H1 */ level: Level;
    /** @name Text align @default Left */ textAlign?: TextAlign;
    /** @name Text @default Lorem ipsum */ text?: string;
    /** @name Color @default #000000 */ color?: string;
}
export declare enum Level {
    H1 = 0,
    H2 = 1,
    H3 = 2,
}
export declare enum TextAlign {
    Left = 0,
    Center = 1,
    Right = 2,
}
declare const Headline: React.StatelessComponent<HeadlineProps>;
export default Headline;
