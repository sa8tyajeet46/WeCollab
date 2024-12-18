import { LayerType } from "@/type/canvas";
import { useStorage } from "@liveblocks/react";
import Rectangle from "./Rectangle";
import Elipse from "./Ellipse";
import Text from "./Text";
import StickyNote from "./StickyNote";
import { liveColorToCss } from "@/lib/utils";
import { Path } from "./Path";

type layerPreviewProps = {
  id: string;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

export default function LayerPreview({
  id,
  onPointerDown,
  selectionColor,
}: layerPreviewProps) {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) return;

  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          points={layer.points}
          onPointerDown={(e) => onPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? liveColorToCss(layer.fill) : "#000"}
          stroke={selectionColor}
        />
      );
    case LayerType.Note:
      return (
        <StickyNote
          id={id}
          layer={layer}
          onPointerDown={onPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Text:
      return (
        <Text
          id={id}
          layer={layer}
          onPointerDown={onPointerDown}
          selectionColor={selectionColor}
        ></Text>
      );
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onPointerDown}
          selectionColor={selectionColor}
        ></Rectangle>
      );
    case LayerType.Ellipse:
      return (
        <Elipse
          id={id}
          layer={layer}
          onPointerDown={onPointerDown}
          selectionColor={selectionColor}
        ></Elipse>
      );
    default:
      return null;
  }
}
