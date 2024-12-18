import useApiMutation from "@/Hook/useApiMutation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link2, Trash, Pencil } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import ConfirmationDialog from "./Confirmation";
import { useRenameBoard } from "@/store/rename-board-store";

export default function Action({
  children,
  side,
  id,
  title,
}: {
  children: React.ReactNode;
  side: "top" | "right" | "bottom" | "left";
  id: string;
  title: string;
}) {
  const { onOpen } = useRenameBoard();
  const copyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Link copied Successfully");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  const { mutate: deleteBoard, pending } = useApiMutation(
    api.board.DeleteBoard
  );

  const deleteSelectedBoard = (id: string) => {
    deleteBoard({ id })
      .then(() => toast.success("Board deleted successfully"))
      .catch(() => toast.error("Failed to delete the board"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align={"start"}
        sideOffset={12}
        style={{ zIndex: 50 }}
        onSelect={(e) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem
          className=" bg-gray-100/50 px-4 py-2 rounded-sm shadow-md hover:bg-white flex items-center  min-w-44"
          onClick={() => {
            copyLink();
          }}
        >
          {/* <div className="z-50 relative bg-white px-2 py-1 rounded-sm"> */}
          <Link2 className="w-4 h-4 mr-2" />
          Copy Board Link
          {/* </div> */}
        </DropdownMenuItem>
        <ConfirmationDialog
          title="Delete Board"
          description="Do you really want to delete the board?"
          disabled={pending}
          onConfirm={() => {
            deleteSelectedBoard(id);
          }}
        >
          <DropdownMenuItem
            className=" bg-gray-100/50 px-4 py-2 rounded-sm shadow-md hover:bg-white flex items-center min-w-44"
            onSelect={(e) => e.preventDefault()}
          >
            {/* <div className="z-50 relative bg-white px-2 py-1 rounded-sm"> */}
            <Trash className="w-4 h-4 mr-2" />
            Delete Board
            {/* </div> */}
          </DropdownMenuItem>
        </ConfirmationDialog>
        <DropdownMenuItem
          className=" bg-gray-100/50 px-4 py-2 rounded-sm shadow-md hover:bg-white flex items-center  min-w-44"
          onClick={() => {
            onOpen(id, title);
          }}
        >
          {/* <div className="z-50 relative bg-white px-2 py-1 rounded-sm"> */}
          <Pencil className="w-4 h-4 mr-2" />
          Rename Title
          {/* </div> */}
        </DropdownMenuItem>

        {/* <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
