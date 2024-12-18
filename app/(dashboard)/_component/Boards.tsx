"use client";
import React from "react";
import NoFavouritesPlaceholder from "./NoFavourites";
import NoBoardPlaceholder from "./NoBoardFound";
import NoDataFoundPlaceholder from "./NoDataFound";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Board from "./Board";
import AddBoard from "./AddBoard";
interface BoardsProps {
  searchParams: {
    favourites?: string;
    search?: string;
  };
  organizationId: string;
}
function Boards({ searchParams, organizationId }: BoardsProps) {
  // const getBoardsFunction=u
  const data = useQuery(api.boards.get, {
    orgId: organizationId,
    title: searchParams.search,
    favourite: searchParams.favourites,
  });
  if (data === undefined) {
    return (
      <div className="w-full p-5">
        <div className="text-3xl pb-5">
          {searchParams.favourites ? "Favourites Boards" : "Team Boards"}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-7">
          <AddBoard />
          <Board.sekelton />
          <Board.sekelton />
          <Board.sekelton />
          <Board.sekelton />
        </div>
      </div>
    );
  }
  //@ts-expect-error  : self might be undefined, handling null case separately
  if (!data?.length && searchParams.favourites) {
    return <NoFavouritesPlaceholder />;
  }
  //@ts-expect-error  : self might be undefined, handling null case separately
  if (!data?.length && searchParams.search) {
    return <NoDataFoundPlaceholder />;
  }
  //@ts-expect-error  : self might be undefined, handling null case separately
  if (!data?.length) {
    return <NoBoardPlaceholder />;
  }

  return (
    <div className="w-full p-5">
      <div className="text-3xl pb-5">
        {searchParams.favourites ? "Favourites Boards" : "Team Boards"}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-7">
        <AddBoard />

        {/* @ts-expect-error : self might be undefined, handling null case separately*/}
        {data?.map((board) => {
          return (
            <Board
              key={board._id}
              id={board._id}
              image={board.image}
              title={board.title}
              authName={board.authName}
              createdAt={board._creationTime}
              favourite={board.favourite}
              authId={board.authId}
              orgId={organizationId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Boards;
