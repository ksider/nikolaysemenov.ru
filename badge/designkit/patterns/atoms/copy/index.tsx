import * as React from "react";
import styled, { css, StyledComponentClass } from "styled-components";

import { fonts } from "../fonts";

export interface CopyProps {
	/** @name CSS Class @hidden */ className?: string;
	/** @name Copy Size @default Medium */ size?: Size;
	/** @name Tag name @hidden */ tagName?: string;
	/** @name Text Align @default Left */ textAlign?: TextAlign;
	/** @name Text @default Enter some text */ text?: string;
	/** @name Color @default #000000 */ color?: string;
}

interface CopyProxyProps {
	className?: string;
	tagName: string;
}

export enum Size {
	Small,
	Medium
}

export enum TextAlign {
	Left,
	Center,
	Right
}

// The proxy component is used to rendering styled componentes with variable
// tag names.
const CopyProxy: React.StatelessComponent<CopyProxyProps> = props => {
	const ProxyComponent = props.tagName;

	return <ProxyComponent className={props.className}>{props.children}</ProxyComponent>;
};

const StyledCopy: StyledComponentClass<CopyProps, {}> = styled(CopyProxy)`
	margin: 0;
	font-family: ${fonts().NORMAL_FONT};
	line-height: 1.5;
	color: ${(props: CopyProps) => props.color || "none"};


	${(props: CopyProps) => {
		switch (props.size) {
			case Size.Small:
				return css`
					font-size: 12px;
				`;
			case Size.Medium:
			default:
				return css`
					font-size: 18px;
				`;
		}
	}};

	${(props: CopyProps) => {
		switch (props.textAlign) {
			case TextAlign.Center:
				return css`
					text-align: center;
				`;
			case TextAlign.Right:
				return css`
					text-align: right;
				`;
			case TextAlign.Left:
				return css`
					text-align: left;
				`;
			default:
				return css`
					text-align: inherit;
				`;
		}
	}};
`;

const Copy: React.StatelessComponent<CopyProps> = (props): JSX.Element => {
	const tagName = props.tagName ? props.tagName : "p";

	return (
		<StyledCopy
			className={props.className}
			tagName={tagName}
			size={props.size}
			textAlign={props.textAlign}
			color={props.color}
		>
			{props.text}
			{props.children}
		</StyledCopy>
	);
};

export default Copy;