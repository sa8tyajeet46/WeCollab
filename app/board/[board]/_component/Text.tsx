import { cn, liveColorToCss } from "@/lib/utils";
import { TextLayer } from "@/type/canvas";
import { useMutation } from "@liveblocks/react";
import { Kalam } from "next/font/google";
import { ContentEditableEvent } from "react-contenteditable";
import ContentEditable from "react-contenteditable"; // Incorrect
const kalam = Kalam({
  subsets: ["latin"],
  weight: "400",
});

export default function Text({
  layer,
  onPointerDown,
  selectionColor,
  id,
}: {
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
  id: string;
}) {
  const getFontSize = (height: number, width: number) => {
    const maxSize = 96;
    const scaleFactor = 0.5;

    const maxHeight = height * scaleFactor;
    const maxWidth = width * scaleFactor;
    return Math.min(maxSize, maxHeight, maxWidth);
  };
  const { x, y, height, width, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue) => {
    const layers = storage.get("layers");
    layers.get(id)?.update({ value: newValue });
  }, []);
  const onChangeHandler = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };
  return (
    <foreignObject
      x={x}
      y={y}
      height={height}
      width={width}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: `1px solid ${selectionColor}` || "transparent",
      }}
      className={cn(`text-[${liveColorToCss(fill)}] `)}
    >
      <ContentEditable
        html={value || "text"}
        style={{
          color: fill ? liveColorToCss(fill) : "#000",
          fontSize: getFontSize(height, width),
        }}
        onChange={onChangeHandler}
        className={cn(
          "w-full h-full flex justify-center items-center shadow-md flex-wrap px-2",
          kalam.className
        )}
      />
    </foreignObject>
  );
}
