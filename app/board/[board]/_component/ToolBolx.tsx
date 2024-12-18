import { Skeleton } from "@/components/ui/skeleton";
import ToolButton from "./ToolButton";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import { CanvasModes, CanvasState, LayerType } from "@/type/canvas";

type ToolBoxProps = {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};
export default function ToolBox({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolBoxProps) {
  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2">
      <div className="flex flex-col px-3 py-2 space-y-1 shadow-md bg-white rounded-md">
        {/* <div>pencil</div>
        <div>circle</div>
        <div>rectangle</div>
        <div>eclipse</div> */}
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => {
            setCanvasState({ mode: CanvasModes.None });
          }}
          isActive={
            canvasState.mode === CanvasModes.None ||
            canvasState.mode === CanvasModes.Translating ||
            canvasState.mode === CanvasModes.Pressing ||
            canvasState.mode === CanvasModes.ReSizing ||
            canvasState.mode === CanvasModes.SelectionNet
          }
        ></ToolButton>
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => {
            setCanvasState({
              mode: CanvasModes.Inserting,
              layerType: LayerType.Text,
            });
          }}
          isActive={
            canvasState.mode === CanvasModes.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        ></ToolButton>
        <ToolButton
          label="Note"
          icon={StickyNote}
          onClick={() => {
            setCanvasState({
              mode: CanvasModes.Inserting,
              layerType: LayerType.Note,
            });
          }}
          isActive={
            canvasState.mode === CanvasModes.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        ></ToolButton>
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => {
            setCanvasState({
              mode: CanvasModes.Inserting,
              layerType: LayerType.Rectangle,
            });
          }}
          isActive={
            canvasState.mode === CanvasModes.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        ></ToolButton>
        <ToolButton
          label="Eclipse"
          icon={Circle}
          onClick={() => {
            setCanvasState({
              mode: CanvasModes.Inserting,
              layerType: LayerType.Ellipse,
            });
          }}
          isActive={
            canvasState.mode === CanvasModes.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        ></ToolButton>
        <ToolButton
          label="pen"
          icon={Pencil}
          onClick={() => {
            setCanvasState({
              mode: CanvasModes.Pencil,
            });
          }}
          isActive={canvasState.mode === CanvasModes.Pencil}
        ></ToolButton>
      </div>
      <div className="flex flex-col px-3 py-2 space-y-1 shadow-md bg-white rounded-md mt-3">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        ></ToolButton>
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={redo}
          isActive={false}
          isDisabled={!canRedo}
        ></ToolButton>
      </div>
    </div>
  );
}

export const ToolBoxSkeleton = () => {
  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 h-96 w-10 bg-white shadow-md rounded-md">
      <Skeleton />
    </div>
  );
};
