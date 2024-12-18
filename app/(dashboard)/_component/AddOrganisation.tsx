import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import TooltipProvide from "./TooltipProvide";
export default function AddOrganisation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square w-10 ">
          <TooltipProvide
            label={"Add Organization"}
            side="right"
            align="end"
            sideOffset={18}
          >
            <button className=" bg-white/25 hover:bg-white/25 opacity-60 hover:opacity-100 transition h-full w-full flex justify-center items-center rounded-md text-white">
              <Plus />
            </button>
          </TooltipProvide>
        </div>
      </DialogTrigger>
      <DialogContent className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-full">
        <CreateOrganization routing="hash" />
      </DialogContent>
    </Dialog>
  );
}
