"use client";
import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
} from "@clerk/nextjs";
import SearchInput from "./SearchInput";
import InviteUsers from "./InviteUsers";

export default function Navbar() {
  const { organization } = useOrganization();
  return (
    <div className="flex w-full  py-4 px-4">
      <div className="px-0 h-10 lg:hidden flex flex-1">
        {" "}
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
                height: "100%",
                border: " 1px solid #e5e7eb",
                borderRadius: "8px",
              },
              organizationSwitcherTrigger: {
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
              },
            },
          }}
        />
      </div>

      <SearchInput />
      {!!organization && (
        <div className="px-10 h-10 lg:flex hidden">
          <InviteUsers />
        </div>
      )}
      <UserButton />
    </div>
  );
}
