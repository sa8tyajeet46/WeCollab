import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import TooltipProvide from "@/app/(dashboard)/_component/TooltipProvide";
import { Button } from "@/components/ui/button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export default function Info() {
  return (
    <div className="absolute left-2 top-2 bg-white rounded-md shadow-md px-2.5 py-3">
      <div className="flex space-x-4 ">
        <TooltipProvide label="Return" side="bottom" sideOffset={5}>
          <Button variant="board">
            <Link href="/" className="flex justify-center align-center">
              <Image src={logo} alt="logo"></Image>
              <div className={cn("text-2xl", poppins.className)}>Board</div>
            </Link>
          </Button>
        </TooltipProvide>
      </div>
    </div>
  );
}

export const InfoSkeleton = () => {
  return (
    <div className="absolute left-2 top-2 bg-white rounded-md shadow-md px-1.5 py-1 w-48 h-10">
      <Skeleton />
    </div>
  );
};
