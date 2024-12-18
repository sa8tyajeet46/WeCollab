import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import TooltipProvide from "@/app/(dashboard)/_component/TooltipProvide";

type AvatarProps = {
  src?: string;
  name: string;
  fallback?: string;
  borderColor?: string;
};

export default function CustomAvatar({
  src,
  name,
  fallback,
  borderColor,
}: AvatarProps) {
  return (
    <Avatar
      style={{
        borderColor: borderColor,
        borderWidth: "3px",

        borderRadius: "999px",
      }}
    >
      <TooltipProvide label={name} side="bottom" sideOffset={5}>
        <AvatarImage
          src={src}
          className="w-7 h-7 rounded-full cursor-pointer"
        />
      </TooltipProvide>
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
