import TooltipProvide from "@/app/(dashboard)/_component/TooltipProvide";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type ToolButtonProps = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isDisabled?: boolean;
  isActive?: boolean;
};

export default function ToolButton({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  isActive,
}: ToolButtonProps) {
  return (
    <TooltipProvide side="right" sideOffset={8} label={label}>
      <Button
        size={"icon"}
        onClick={onClick}
        disabled={isDisabled}
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon></Icon>
      </Button>
    </TooltipProvide>
  );
}
