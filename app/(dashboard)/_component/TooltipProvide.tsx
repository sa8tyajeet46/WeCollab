import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import React from "react";

function TooltipProvide({
  children,
  label,
  side,
  align,
  sideOffset,
  alignOffset,
}: {
  children: React.ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "start" | "end";
  sideOffset?: number;
  alignOffset?: number;
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className="bg-black text-white px-2 py-1 rounded-sm flex justify-center items-center capitalize text-sm"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipProvide;
