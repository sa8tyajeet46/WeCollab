import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import TooltipProvide from "./TooltipProvide";

interface Itemprops {
  imageUrl: string;
  orgName: string;
  orgId: string;
}
export default function Item({ imageUrl, orgName, orgId }: Itemprops) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === orgId;

  const handleClick = () => {
    if (!setActive) return null;

    setActive({ organization: orgId });
  };
  return (
    <div
      className="aspect-square relative h-full w-full  overflow-hidden "
      onClick={handleClick}
    >
      <TooltipProvide
        label={orgName}
        side="right"
        align="center"
        sideOffset={18}
      >
        <Image
          src={imageUrl}
          fill
          alt="org image"
          className={cn(
            "rounded-md cursor-pointer",
            isActive ? "opacity-100" : "opacity-70"
          )}
        ></Image>
      </TooltipProvide>
    </div>
  );
}
