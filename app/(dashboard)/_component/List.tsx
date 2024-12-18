"use client";
import { useOrganizationList } from "@clerk/nextjs";
import Item from "./Item";

export default function List() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  if (userMemberships.data?.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {userMemberships.data?.map((org) => {
        return (
          <Item
            imageUrl={org.organization.imageUrl}
            orgId={org.organization.id}
            orgName={org.organization.name}
            key={org.organization.id}
          ></Item>
        );
      })}
    </div>
  );
}
