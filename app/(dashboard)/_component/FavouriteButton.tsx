import { api } from "@/convex/_generated/api";
import useApiMutation from "@/Hook/useApiMutation";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function FavouriteButton({
  favourite,
  id,
  orgId,
}: {
  favourite: boolean;
  id: string;
  orgId: string;
  userId?: string;
}) {
  const { pending, mutate: makeFavourite } = useApiMutation(
    api.board.Favourite
  );
  const { pending: unFavourtitePending, mutate: unFavourite } = useApiMutation(
    api.board.UnFavourite
  );
  const toggleFavourite = () => {
    if (favourite) {
      unFavourite({ id: id }).catch(() => {
        toast.error("something went wrong");
      });
    } else {
      makeFavourite({ id: id, orgId: orgId }).catch(() => {
        toast.error("something went wrong");
      });
    }
  };
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavourite();
      }}
      disabled={pending || unFavourtitePending}
    >
      <Star
        fill={favourite ? "rgb(251 191 36" : "none"}
        className={cn("h-5 w-5 my-1 mx-1", favourite && "text-amber-400 ")}
      ></Star>
    </button>
  );
}
