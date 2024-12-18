"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyOrg from "./EmptyOrg";
import Boards from "./_component/Boards";

interface searchParmasprops {
  searchParams: {
    favourites?: string;
    search?: string;
  };
}
export default function Home({ searchParams }: searchParmasprops) {
  const { organization } = useOrganization();
  if (!organization) return <EmptyOrg />;
  return (
    <div className="w-full">
      <Boards
        searchParams={searchParams}
        organizationId={organization.id}
      ></Boards>
    </div>
  );
}
