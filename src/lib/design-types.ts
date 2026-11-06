export type Point = { x: number; y: number; marker?: string };

type Placement = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity?: number;
};

export type GroupNode = Placement & {
  type: "group";
  innerWidth: number;
  innerHeight: number;
  children: DesignNode[];
};

export type TextNode = Placement & {
  type: "text";
  text: string;
  lines: string[];
  family: string;
  fontSize: number;
  weight: number;
  color: string;
  italic?: boolean;
  align: "left" | "right" | "center";
  letterSpacing: string;
  lineHeight: number;
  baselineShift: number;
  kerning: "normal" | "none";
  href?: string;
};

export type ImageNode = Placement & {
  type: "image";
  assetId: string;
  src: string;
  crop?: { x: number; y: number; width: number; height: number };
};

export type ShapeNode = Placement & {
  type: "shape";
  viewWidth: number;
  viewHeight: number;
  paths: {
    d: string;
    fill: string;
    stroke?: string;
    strokeWidth?: number;
    dash?: number[];
    radius?: number;
  }[];
};

export type LineNode = Placement & {
  type: "line";
  start: Point;
  end: Point;
  stroke: string;
  strokeWidth: number;
  dash?: number[];
  bends: { axis: "x" | "y"; value: number }[];
  radius: number;
};

export type DesignNode = GroupNode | TextNode | ImageNode | ShapeNode | LineNode;

export type DesignPage = {
  number: number;
  width: number;
  height: number;
  nodes: DesignNode[];
};
