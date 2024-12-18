import { Button } from "@/components/ui/button";
import React from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { OrganizationProfile } from "@clerk/nextjs";
function InviteUsers() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="secondary"
          className="flex justify-center items-center"
        >
          <Plus />
          <span> Invite Members</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <OrganizationProfile
          routing="hash"
          appearance={{
            elements: {
              rootBox: {
                zIndex: "50",
                position: "absolute",
                left: "25%",
                top: "3%",
              },
              // organizationSwitcherTrigger: {
              //   width: "100%",
              //   height: "100%",
              //   display: "flex",
              //   justifyContent: "center",
              // },
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default InviteUsers;
