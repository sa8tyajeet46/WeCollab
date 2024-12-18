import { api } from "@/convex/_generated/api";
import useApiMutation from "@/Hook/useApiMutation";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddBoard() {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate: createBoard, pending } = useApiMutation(
    api.board.createBoard
  );
  return (
    <button
      className={cn(
        "group aspect-[100/127]  rounded-md overflow-hidden relative bg-amber-400 text-white flex flex-col justify-center space-y-1 items-center",
        pending ? "cursor-not-allowed" : "cursor-pointer"
      )}
      disabled={pending}
      onClick={() => {
        if (!organization) return;
        createBoard({
          title: "untitled",
          orgId: organization.id,
        })
          .then((id) => {
            toast.success("Board Created Successfully");
            router.push(`/board/${id}`);
          })
          .catch(() => toast.error("can't create board"));
      }}
    >
      <Plus className="w-10 h-10"></Plus>
      <div>Add a new Board</div>
    </button>
  );
}
