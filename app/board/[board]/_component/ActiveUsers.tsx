"use client";

import { useOthers, useSelf } from "@liveblocks/react";
import CustomAvatar from "./Avatar";
import { getBorder } from "@/lib/utils";

const MAX_SHOWN_USER = 1;

export default function ActiveUsers() {
  const self = useSelf();
  const others = useOthers();

  const hasMoreUser = others.length > MAX_SHOWN_USER;
  return (
    <div className="absolute right-2 top-2 bg-white rounded-md shadow-md px-2.5 py-2">
      <div className="flex space-x-1.5">
        <CustomAvatar
          src={self?.info?.image}
          name={self?.info?.name ?? "Me"}
          fallback={self?.info?.name ?? "M"}
          borderColor={getBorder(self?.connectionId)}
        />

        {others.slice(0, MAX_SHOWN_USER)?.map(({ connectionId, info }) => {
          return (
            <CustomAvatar
              key={connectionId}
              src={info?.image}
              name={info?.name ?? "TeamMate"}
              fallback={info?.name?.[0] ?? "T"}
              borderColor={getBorder(connectionId)}
            />
          );
        })}

        {hasMoreUser && (
          <div className="w-7 h-7 rounded-full cursor-pointer bg-neutral-200 flex justify-center items-center">
            +{`${others.length - MAX_SHOWN_USER}`}
          </div>
        )}
      </div>
    </div>
  );
}

export const ActiveUsersSkeleton = () => {
  return (
    <div className="absolute right-2 top-2 bg-white rounded-md shadow-md px-1.5 py-1 h-10 w-20"></div>
  );
};
