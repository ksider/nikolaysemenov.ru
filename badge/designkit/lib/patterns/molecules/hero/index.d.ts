/// <reference types="react" />
import * as React from "react";
import { Level, TextAlign } from "../../atoms/headline";
export interface TeaserProps {
    /** @name Copy text */ copyText: string;
    /** @name Headline level */ headlineLevel: Level;
    /** @name Headline align */ headlineAlign?: TextAlign;
    /** @name Headline text */ headlineText: string;
}
declare const Teaser: React.StatelessComponent<TeaserProps>;
export default Teaser;
