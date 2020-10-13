/// <reference types="react" />
import * as React from "react";
export declare enum Direction {
    /** @name horizontal */ HORIZONTAL = 0,
    /** @name vertical */ VERTICAL = 1,
}
export interface LayoutProps {
    /** @name Direction @default vertical */ direction?: Direction;
    /** @name Maximum width @default 100% */ maxWidth?: string;
    /** @name Background color @default transparent */ backgroundColor?: string;
}
declare const Layout: React.StatelessComponent<LayoutProps>;
export default Layout;
