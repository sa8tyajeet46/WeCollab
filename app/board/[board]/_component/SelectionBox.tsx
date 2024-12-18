import { useSelf, useStorage } from "@liveblocks/react";
import { memo } from "react";
import { LayerType, Side, XYWH } from "./../../../../type/canvas";
import { useSelectionBounds } from "@/Hook/use-selection-bound";

const HANDLE_WIDTH = 8;

//
interface SelectionBoxProps {
  onResizePointerDown: (corner: Side, initialBound: XYWH) => void;
}

export const SelectionBox = memo(
  ({ onResizePointerDown }: SelectionBoxProps) => {
    const selectedLayer = useSelf((root) => {
      return root.presence.selection.length === 1
        ? root.presence.selection[0]
        : null;
    });

    const allowResize = useStorage((root) => {
      return (
        selectedLayer &&
        root.layers.get(selectedLayer)?.type != Number(LayerType.Path)
      );
    });

    const bounds = useSelectionBounds();

    if (!bounds) return null;

    return (
      // <rect
      //   height={bounds.height}
      //   width={bounds.width}
      //   style={{
      //     transform: `translate(${bounds.x}px, ${bounds.y}px)`,
      //     // backgroundColor: "#000",
      //   }}
      //   className="stroke-1 fill-transparent stroke-blue-500 pointer-events-none"
      //   x={0}
      //   y={0}
      //   // onPointerDown={(e) => {
      //   //   onPointerDown(e, id);
      //   // }}
      // >
      <>
        <rect
          height={bounds.height}
          width={bounds.width}
          style={{
            transform: `translate(${bounds.x}px, ${bounds.y}px)`,
            // backgroundColor: "#000",
          }}
          className="stroke-1 fill-transparent stroke-blue-500 pointer-events-none"
          x={0}
          y={0}
        ></rect>
        {allowResize && (
          <>
            <rect
              className="fill-white stroke-1 stroke-blue-500 absolute"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",

                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizePointerDown(Side.Top + Side.Left, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                   ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizePointerDown(Side.Top, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                    ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizePointerDown(Side.Top + Side.Right, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                    ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizePointerDown(Side.Right, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                    ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizePointerDown(Side.Bottom + Side.Right, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                    ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizePointerDown(Side.Bottom, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px, 
                    ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizePointerDown(Side.Bottom + Side.Left, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px, 
                    ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizePointerDown(Side.Left, bounds);
              }}
            />
          </>
        )}
      </>
    );
  }
);

SelectionBox.displayName = "SelectionBox";
