export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export type RectangleLayer = {
  type: LayerType.Rectangle;
  height: number;
  width: number;
  x: number;
  y: number;
  fill: Color;
  value?: string;
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  height: number;
  width: number;
  x: number;
  y: number;
  fill: Color;
  value?: string;
};

export type PathLayer = {
  type: LayerType.Path;
  height: number;
  width: number;
  x: number;
  y: number;
  fill: Color;
  points: number[][];
  value?: string;
};

export type TextLayer = {
  type: LayerType.Text;
  height: number;
  width: number;
  x: number;
  y: number;
  fill: Color;
  value?: string;
};

export type NoteLayer = {
  type: LayerType.Note;
  height: number;
  width: number;
  x: number;
  y: number;
  fill: Color;
  value?: string;
};

export type point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}
export type CanvasState =
  | {
      mode: CanvasModes.None;
    }
  | {
      mode: CanvasModes.Pressing;
      origin: point;
    }
  | {
      mode: CanvasModes.SelectionNet;
      origin: point;
      current?: point;
    }
  | {
      mode: CanvasModes.Translating;
      current: point;
    }
  | {
      mode: CanvasModes.ReSizing;
      initialBound: XYWH;
      corner: Side;
    }
  | {
      mode: CanvasModes.Pencil;
    }
  | {
      mode: CanvasModes.Inserting;
      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Rectangle
        | LayerType.Text;
    };

export enum CanvasModes {
  None,
  Pressing,
  SelectionNet,
  Translating,
  ReSizing,
  Pencil,
  Inserting,
}

export type layer =
  | RectangleLayer
  | NoteLayer
  | EllipseLayer
  | TextLayer
  | PathLayer;
