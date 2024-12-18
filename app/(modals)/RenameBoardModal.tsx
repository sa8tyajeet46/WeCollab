"use client";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import useApiMutation from "@/Hook/useApiMutation";
import { useRenameBoard } from "@/store/rename-board-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RenameBoardModal() {
  const { mutate: renameboard } = useApiMutation(api.board.RenameBoard);
  const { open, intialValue, onClose } = useRenameBoard();
  const [title, setTitle] = useState(intialValue.title);

  useEffect(() => {
    setTitle(intialValue.title);
  }, [intialValue.title]);

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rename Board Title</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form
            className="w-full space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              renameboard({ id: intialValue.id, title: title })
                .then(() => {
                  toast.success("Board Edited successfully");
                  onClose();
                })
                .catch(() => {
                  toast.error("something went Wrong");
                });
            }}
          >
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              className="pl-3 border-2  bg-[#f4f4f4] max-w-[567px] focus:!outline-0 focus:!ring-0 border-none"
              placeholder="Enter title"
            ></Input>
            {/* <AlertDialogAction> */}
            <div className="flex w-full justify-end space-x-2">
              <Button type="submit">Save</Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onClose();
                }}
              >
                cancel
              </Button>
            </div>
            {/* </AlertDialogAction> */}
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
