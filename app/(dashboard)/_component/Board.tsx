"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import Action from "./Action";
import FavouriteButton from "./FavouriteButton";
// ../././public/placeholder/cardplaceholder/03.jpg

export default function Board({
  id,
  image,
  title,
  authName,
  createdAt,
  favourite,
  authId,
  orgId,
}: {
  id: string;
  image: string;
  title: string;
  authName: string;
  createdAt: number;
  favourite: boolean;
  authId: string;
  orgId: string;
}) {
  const { userId } = useAuth();
  const authLabel = userId === authId ? "you" : authName;
  const createdLabel = formatDistanceToNow(createdAt);
  return (
    // <Image src={`/${image}`} alt="placeholder" width={100} height={100}></Image>
    <Link
      href={`/board/${id}`}
      onClick={(e) => {
        //@ts-expect-error : self might be undefined, handling null case separately

        if (e.target.id != "image") {
          e.preventDefault(); // Prevent navigation when interacting with dropdown
        }
      }}
    >
      <div className="flex flex-col justify-center z-0 ">
        <div className="group aspect-[100/127]  rounded-md overflow-hidden relative">
          <Image
            id="image"
            src={`/${image}`}
            alt="placeholder"
            fill
            className="object-fill z-0"
          ></Image>
          <Action side="right" id={id} title={title}>
            <MoreHorizontal className="text-white absolute right-2 top-2 opacity-0 group-hover:opacity-100 z-10" />
          </Action>
          <div
            className="w-full h-full opacity-0 group-hover:opacity-50 bg-black"
            id="image"
          ></div>
        </div>
        <div className="flex w-full py-1 items-start">
          <div className="flex flex-col w-full space-y-1">
            <div className="truncate text-[16px] max-w-[calc(100%-36px)]">
              <div>{title}</div>
            </div>
            <div className="text-[13px]">
              {authLabel},{createdLabel}
            </div>
          </div>
          <FavouriteButton
            favourite={favourite}
            id={id}
            orgId={orgId}
            userId={userId ? userId : ""}
          />
        </div>
      </div>
    </Link>
  );
}

Board.sekelton = () => {
  return (
    <div className="aspect-[100/127]  rounded-md overflow-hidden relative">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
