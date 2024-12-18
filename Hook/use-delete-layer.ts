import { useSelf, useMutation } from "@liveblocks/react";

export const useDeleteLayer = () => {
  const selection = useSelf((root) => root.presence.selection) || [];

  return useMutation(
    ({ storage, setMyPresence }) => {
      const layers = storage.get("layers");
      const layerId = storage.get("layerIds");

      for (const id of selection) {
        layers.delete(id);

        if (layerId.indexOf(id) != -1) {
          layerId.delete(layerId.indexOf(id));
        }
      }

      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [selection]
  );
};
