"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import queryString from "query-string";

function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const [debouncedValue] = useDebounce(value, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: { search: debouncedValue },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url);
  }, [router, debouncedValue]);

  return (
    <div className="lg:flex flex-1  hidden  relative ">
      <Search className="absolute top-2 left-2"></Search>
      <Input
        className="pl-9 border-2  bg-[#f4f4f4] max-w-[567px] focus:!outline-0 focus:!ring-0 border-none"
        placeholder="search"
        type="text"
        value={value}
        onChange={handleSearch}
      ></Input>
    </div>
  );
}

export default SearchInput;
