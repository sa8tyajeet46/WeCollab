import { liveColorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/type/canvas";

export default function Elipse({
  layer,
  onPointerDown,
  selectionColor,
  id,
}: {
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
  id: string;
}) {
  const { x, y, height, width, fill } = layer;
  return (
    <ellipse
      //   height={height}
      //   width={width}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        // backgroundColor: "#000",y
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      stroke={selectionColor}
      fill={liveColorToCss(fill)}
      strokeWidth={1}
      onPointerDown={(e) => {
        onPointerDown(e, id);
      }}
    ></ellipse>
  );
}
