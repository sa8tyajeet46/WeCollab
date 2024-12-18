"use client";
import ActiveUsers, { ActiveUsersSkeleton } from "./ActiveUsers";
import Info, { InfoSkeleton } from "./Info";
import ToolBox, { ToolBoxSkeleton } from "./ToolBolx";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useMemo, useState } from "react";
import { Loader } from "lucide-react";
import {
  useHistory,
  useSelf,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "@liveblocks/react";
import {
  CanvasModes,
  CanvasState,
  LayerType,
  point,
  Side,
  XYWH,
} from "@/type/canvas";
import {
  getBorder,
  liveColorToCss,
  penPointsToPathLayer,
  pointerToPresence,
  resizeBounds,
} from "@/lib/utils";
import UserCrusorPresence from "./UserCursorPresence";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import LayerPreview from "./LayerPreview";
import { SelectionBox } from "./SelectionBox";
import { SelectionToolBox } from "./SelectionToolBox";
import { Path } from "./Path";

const MAX_LAYERS = 100;

export default function Canvas() {
  const info = useSelf((me) => me.info);
  const pencilDraft = useSelf((self) => self.presence.pencilDraft);

  // console.log(layers);
  const layerIds = useStorage((storage) => storage.layerIds);
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasModes.None,
  });

  // console.log(canvasState);

  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState({
    r: 255,
    g: 255,
    b: 255,
  });

  // console.log(camera, "camera");

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      console.log(e.deltaX, e.deltaY);
      setCamera({
        x: camera.x - e.deltaX,
        y: camera.y - e.deltaY,
      });
    },
    [camera]
  );

  const resizeLayer = useMutation(
    ({ storage, self }, points) => {
      if (canvasState.mode != CanvasModes.ReSizing) {
        return;
      }
      const me = self.presence.selection[0];

      if (!me) {
        return;
      }

      const liveLayer = storage.get("layers").get(me);

      const bounds = resizeBounds(
        canvasState.initialBound,
        canvasState.corner,
        points
      );
      if (liveLayer) {
        liveLayer.update(bounds);
      }
    },
    [canvasState]
  );

  const translateLayer = useMutation(
    ({ storage, self }, points) => {
      if (canvasState.mode != CanvasModes.Translating) {
        return;
      }

      const bound = {
        x: points.x - canvasState.current.x,
        y: points.y - canvasState.current.y,
      };
      const selection = self.presence.selection;
      for (const id of selection) {
        console.log(id, "====>id");
        const layer = storage.get("layers").get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + bound.x,
            y: layer.get("y") + bound.y,
          });
        }
      }

      setCanvasState({ mode: CanvasModes.Translating, current: points });
    },
    [canvasState, setCanvasState, camera]
  );

  const startDrawing = useMutation(
    ({ setMyPresence }, point: point, pressure) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor]
  );

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: point, event: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        canvasState.mode !== CanvasModes.Pencil ||
        event.buttons !== 1 ||
        !pencilDraft
      )
        return;

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, event.pressure]],
      });
    },
    [canvasState.mode]
  );

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      if (
        !pencilDraft ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({
        mode: CanvasModes.Pencil,
      });
    },
    [lastUsedColor]
  );

  const unselectLayer = useMutation(({ setMyPresence, self }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const setPointerPresense = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerToPresence(e, camera);

      if (canvasState.mode === CanvasModes.Translating) {
        // console.log("translating");
        translateLayer(current);
      } else if (canvasState.mode === CanvasModes.ReSizing) {
        resizeLayer(current);
      } else if (canvasState.mode === CanvasModes.Pencil) {
        continueDrawing(current, e);
      }

      setMyPresence({ cursor: current });
    },
    [canvasState, resizeLayer, translateLayer, continueDrawing]
  );

  const insertLayer = useMutation(
    (
      { setMyPresence, storage },
      layerToBeInserted:
        | LayerType.Rectangle
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Text,
      path: point
    ) => {
      const layers = storage.get("layers");
      if (layers.size > MAX_LAYERS) {
        return;
      }
      const layerIds = storage.get("layerIds");
      const newLayerId = nanoid();

      const newlayer = new LiveObject({
        type: layerToBeInserted,
        x: path.x,
        y: path.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });
      layerIds.push(newLayerId);

      layers.set(newLayerId, newlayer);

      setMyPresence({ selection: [newLayerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasModes.None });
    },
    [lastUsedColor]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const current = pointerToPresence(e, camera);
      if (canvasState.mode === CanvasModes.Inserting) {
        return;
      }

      if (canvasState.mode === CanvasModes.Pencil) {
        startDrawing(current, e.pressure);
        return;
      }

      setCanvasState({ mode: CanvasModes.Pressing, origin: current });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );

  const onPointerUp = useMutation(
    ({}, e: React.PointerEvent) => {
      const position = pointerToPresence(e, camera);
      if (
        canvasState.mode === CanvasModes.None ||
        canvasState.mode === CanvasModes.Pressing
      ) {
        unselectLayer();
      } else if (canvasState.mode === CanvasModes.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasModes.Inserting) {
        insertLayer(canvasState.layerType, position);
      } else {
        setCanvasState({ mode: CanvasModes.None });
      }

      history.resume();
    },
    [canvasState, camera, insertLayer, history, insertPath, startDrawing]
  );

  const setOnPointerLeave = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = null;

      setMyPresence({ cursor: current });
    },
    []
  );

  const selections = useOthersMapped((root) => root.presence.selection);

  const selectionIdsToColors = useMemo(() => {
    const selectionIdsToColors: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        selectionIdsToColors[layerId] = getBorder(connectionId);
      }

      return selectionIdsToColors;
    }
  }, [selections]);

  const setMySelection = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasModes.Inserting ||
        canvasState.mode === CanvasModes.Pencil
      ) {
        return;
      }
      history.pause();
      e.stopPropagation();

      const current = pointerToPresence(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence(
          { cursor: current, selection: [layerId] },
          { addToHistory: true }
        );
        setCanvasState({ mode: CanvasModes.Translating, current: current });
      }
    },
    [camera, canvasState, history]
  );

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBound: XYWH) => {
      history.pause();
      setCanvasState({
        mode: CanvasModes.ReSizing,
        initialBound: initialBound,
        corner: corner,
      });
    },
    [history]
  );
  if (!info) {
    return <CanvasSkeleton />;
  }

  return (
    <main className="w-full h-screen bg-neutral-100 relative touch-none">
      <Info />
      <ActiveUsers />
      <SelectionToolBox camera={camera} setLastUsedColor={setLastUsedColor} />
      <ToolBox
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={history.redo}
        undo={history.undo}
      />
      <svg
        className="w-[100vw] h-[100vh] "
        onWheel={onWheel}
        onPointerMove={(e) => setPointerPresense(e)}
        onPointerLeave={(e) => setOnPointerLeave(e)}
        onPointerUp={(e) => onPointerUp(e)}
        onPointerDown={(e) => onPointerDown(e)}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds?.map((layedId, i) => {
            return (
              <LayerPreview
                key={i}
                id={layedId}
                selectionColor={
                  selectionIdsToColors?.[layedId] || "transparent"
                }
                onPointerDown={setMySelection}
              ></LayerPreview>
            );
          })}

          <SelectionBox
            onResizePointerDown={onResizeHandlePointerDown}
          ></SelectionBox>
          <UserCrusorPresence />
          {pencilDraft && pencilDraft.length > 0 && (
            <Path
              fill={liveColorToCss(lastUsedColor)}
              points={pencilDraft}
              x={0}
              y={0}
            />
          )}
        </g>
      </svg>
    </main>
  );
}

export const CanvasSkeleton = () => {
  return (
    <main className="w-full h-screen bg-neutral-100 flex justify-center items-center">
      <InfoSkeleton />
      <ActiveUsersSkeleton />
      <ToolBoxSkeleton />
      <Loader className="w-6 h-6 animate-spin" />
      <Skeleton />
    </main>
  );
};
