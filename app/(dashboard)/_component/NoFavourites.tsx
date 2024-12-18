import Image from "next/image";
import React from "react";
import NoFavourites from "@/public/assets/favourites-placeholder.svg";

function NoFavouritesPlaceholder() {
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
      <div className="text-xl font-semibold">No Favourite found</div>
    </div>
  );
}

export default NoFavouritesPlaceholder;
