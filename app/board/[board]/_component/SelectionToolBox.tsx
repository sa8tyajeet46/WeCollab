import { useSelectionBounds } from "@/Hook/use-selection-bound";
import { Camera, Color } from "@/type/canvas";
import { useMutation, useSelf } from "@liveblocks/react";
import { Dispatch, memo, SetStateAction } from "react";
import { ColorPicker } from "./ColorPicker";
import { useDeleteLayer } from "@/Hook/use-delete-layer";
import TooltipProvide from "./../../../(dashboard)/_component/TooltipProvide";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack } from "lucide-react";

interface selectionToolBoxProps {
  camera: Camera;
  setLastUsedColor: Dispatch<
    SetStateAction<{ r: number; g: number; b: number }>
  >;
}

export const SelectionToolBox = memo(
  ({ camera, setLastUsedColor }: selectionToolBoxProps) => {
    const selection = useSelf((root) => root.presence.selection);

    const deleteLayer = useDeleteLayer();

    const changeLayerColor = useMutation(
      ({ storage }, fill: Color) => {
        const layer = storage.get("layers");

        selection?.forEach((e) => {
          layer.get(e)?.update({ fill: fill });
        });
        setLastUsedColor(fill);
      },
      [selection, setLastUsedColor]
    );
    const MoveToBack = useMutation(
      ({ storage }) => {
        const layerId = storage.get("layerIds");

        const indices: number[] = [];
        const arr = layerId.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) indices.push(i);
        }

        for (let i = 0; i < indices.length; i++) {
          layerId.move(indices[i], i);
        }
      },
      [selection]
    );

    const MoveToFront = useMutation(
      ({ storage }) => {
        const layerId = storage.get("layerIds");

        const indices: number[] = [];
        const arr = layerId.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) indices.push(i);
        }

        for (let i = 0; i < indices.length; i++) {
          layerId.move(indices[i], arr.length - 1 - i);
        }
      },
      [selection]
    );

    const bounds = useSelectionBounds();

    if (!bounds) return null;

    const x = bounds.width / 2 + camera.x + bounds.x;
    const y = bounds.y + camera.y;

    return (
      <div
        className="absolute bg-white p-3 rounded-xl shadow-sm border flex select-none"
        style={{
          transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`,
        }}
      >
        <ColorPicker onChange={changeLayerColor} />
        <div className="flex flex-col gap-y-0.5">
          <Button
            variant="board"
            size="icon"
            onClick={() => {
              MoveToFront();
            }}
          >
            <BringToFront />
          </Button>
          <Button
            variant="board"
            size="icon"
            onClick={() => {
              MoveToBack();
            }}
          >
            <SendToBack />
          </Button>
        </div>
        <div className="flex  items-center justify-center cursor-pointer pl-2">
          <TooltipProvide label="Delete" side="bottom" sideOffset={5}>
            <button
              onClick={() => {
                deleteLayer();
              }}
            >
              <Trash2></Trash2>
            </button>
          </TooltipProvide>
        </div>
      </div>
    );
  }
);

SelectionToolBox.displayName = "SelectionToolBox";
