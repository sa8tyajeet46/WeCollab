"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export default function OrganisationBar() {
  const params = useSearchParams();

  const favourites = params.get("favourites");
  return (
    <div className=" h-full px-2  w-[190px] hidden lg:flex lg:flex-col justify-start py-4 lg:space-y-5">
      {/* Logo */}
      <Link href="/" className="flex justify-center align-center">
        <Image src={logo} alt="logo"></Image>
        <div className={cn("text-2xl", poppins.className)}>Board</div>
      </Link>
      <div className="px-0 h-10">
        {" "}
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
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
      <Link href="/" className="w-full">
        <Button
          variant={favourites ? "ghost" : "secondary"}
          className="flex space-x-2 text-sm w-full justify-start"
        >
          <LayoutDashboard />
          <span>Team Boards</span>
        </Button>
      </Link>
      <Link
        href={{ pathname: "/", query: { favourites: true } }}
        className="w-full"
      >
        <Button
          variant={favourites ? "secondary" : "ghost"}
          className="flex space-x-2 text-sm w-full justify-start"
        >
          <Star />
          <span>Favourite Boards</span>
        </Button>
      </Link>
    </div>
  );
}
