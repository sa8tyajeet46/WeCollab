import Image from "next/image";
import React from "react";
import NoFavourites from "@/public/assets/Saly-15.svg";

function NoDataFoundPlaceholder() {
  return (
    <div className="flex  w-full h-full flex-col justify-center items-center space-y-3">
      <div>
        <Image
          src={NoFavourites}
          alt="placeholder"
          height={260}
          width={260}
        ></Image>
      </div>
      <div className="text-xl font-semibold">No Data found</div>
    </div>
  );
}

export default NoDataFoundPlaceholder;
