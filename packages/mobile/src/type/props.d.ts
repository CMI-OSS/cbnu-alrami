import * as React from "react";

export type StyleProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type DefaultProps = {
  children?: React.ReactNode;
} & StyleProps;

export type IconProps = {
  size: number;
  fill?: string;
  stroke?: string;
  style?: React.CSSProperties;
};
