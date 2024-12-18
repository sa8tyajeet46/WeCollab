import Image from "next/image";
import React from "react";
import EmptyPng from "@/public/assets/EmptyOrg.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";

import { CreateOrganization } from "@clerk/nextjs";

function EmptyOrg() {
  return (
    <div className="flex  w-full h-full flex-col justify-center items-center space-y-3">
      <div>
        <Image
          src={EmptyPng}
          alt="placeholder"
          height={260}
          width={260}
        ></Image>
      </div>
      <div className="text-xl font-semibold">No Organization selected</div>
      <Dialog>
        <DialogTrigger>
          <div>
            <Button>Add Organization</Button>
          </div>
        </DialogTrigger>
        <DialogContent asChild className="">
          <div className="absolute">
            <CreateOrganization routing="hash" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmptyOrg;
