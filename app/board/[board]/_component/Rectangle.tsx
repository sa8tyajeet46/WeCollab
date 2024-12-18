import { liveColorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/type/canvas";

export default function Rectangle({
  layer,
  onPointerDown,
  selectionColor,
  id,
}: {
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
  id: string;
}) {
  const { x, y, height, width, fill } = layer;
  return (
    <rect
      height={height}
      width={width}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        // backgroundColor: "#000",y
      }}
      stroke={selectionColor}
      fill={liveColorToCss(fill)}
      strokeWidth={1}
      onPointerDown={(e) => {
        onPointerDown(e, id);
      }}
    ></rect>
  );
}
