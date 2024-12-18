import logo from "@/public/assets/logo.svg";
import Image from "next/image";
export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image
        src={logo}
        height="120"
        width="120"
        alt="logo"
        className="animate-pulse duration-700"
      ></Image>
    </div>
  );
}
