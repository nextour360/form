import type { ComponentType } from 'react';
export type Icon = JSX.Element | ComponentType | string;

export type IconDescriptor = {
	src: Icon;
	background?: string;
	foreground?: string;
	shadowColor?: string;
};
export type IconRenderer = IconDescriptor | Icon | undefined;
