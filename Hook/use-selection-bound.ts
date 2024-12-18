import { layer } from "@/type/canvas";
import { shallow } from "@liveblocks/client";
import { memo } from "react";
import { XYWH } from "@/type/canvas";
import { useSelf, useStorage } from "@liveblocks/react";

const initialBound: (layers: any) => XYWH | null = (layers) => {
  const first = layers[0];

  if (!first) {
    return null;
  }

  let left = first.x;
  let right = first.x + first.width;
  let top = first.y;
  let bottom = first.y + first.height;

  for (let i = 0; i < layers.length; i++) {
    const { x, y, width, height } = layers[i];

    if (x < left) left = x;

    if (x + width > right) right = x + width;

    if (y < top) top = y;

    if (y + height > bottom) bottom = y + height;
  }

  return {
    x: left,
    y: top,
    height: bottom - top,
    width: right - left,
  };
};

export const useSelectionBounds = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useStorage((root) => {
    const selectionLayer = selection
      ?.map((layerId) => root.layers.get(layerId))
      .filter(Boolean);

    return initialBound(selectionLayer);
  }, shallow);
};
