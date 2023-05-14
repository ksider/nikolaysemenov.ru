/// <reference types="react" />
import * as React from "react";
export interface TeaserProps {
    /** @name Button label @default Label */ buttonLabel: string;
    /** @name Copy text @default Copytext */ copyText: string;
    /** @name Headline level @default H1 */ headlineLevel: Level;
    /** @name Headline align @default Left */ headlineAlign?: TextAlign;
    /** @name Headline text @default Headline */ headlineText: string;
    /** @hidden */ onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
declare const Teaser: React.StatelessComponent<TeaserProps>;
export default Teaser;
