import { create } from "zustand";
const defaultValues = { id: "", title: "" };

type RenameBoardProps = {
  open: boolean;
  intialValue: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
};

export const useRenameBoard = create<RenameBoardProps>((set) => ({
  open: false,
  intialValue: defaultValues,
  onOpen: (id, title) =>
    set(() => ({ intialValue: { id: id, title: title }, open: true })),
  onClose: () => set(() => ({ intialValue: defaultValues, open: false })),
}));
