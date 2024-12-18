"use client";
import Image from "next/image";
import React from "react";
import NoFavourites from "@/public/assets/Saly-26.svg";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

import { toast } from "sonner";
import useApiMutation from "@/Hook/useApiMutation";

function NoBoardPlaceholder() {
  const { organization } = useOrganization();
  const { mutate: createBoard, pending } = useApiMutation(
    api.board.createBoard
  );
  const OnCLick = async () => {
    if (!organization) return;

    await createBoard({
      title: "untitled",
      orgId: organization.id,
    })
      .then(() => {
        toast.success("Board Created Successfully");
      })
      .catch(() => toast.error("can't create board"));
  };
  return (
    <div className="flex  w-full h-full flex-col justify-center items-center space-y-3">
      <div>
        <Image
          src={NoFavourites}
          alt="placeholder"
          height={260}
          width={260}
        ></Image>
      </div>
      <div className="text-xl font-semibold">No Board found</div>
      <Button disabled={pending} onClick={OnCLick}>
        Create Your First Board
      </Button>
    </div>
  );
}

export default NoBoardPlaceholder;
