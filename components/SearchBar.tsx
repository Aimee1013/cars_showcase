"use client";
import { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-0 z-10 ${otherClasses}`}>
    <Image src="/magnifying-glass.svg" alt="magnifying glass" width={40} height={40} className="object-contain" />
  </button>
);

const SearchBar = ({ setManufacturer, setModel }) => {
  const [searchManufacturer, setsearchManufacturer] = useState("");
  const [searchModel, setsearchModel] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchManufacturer === "" && searchModel === "") {
      return alert("Please fill in the search bar");
    }

    setManufacturer(searchManufacturer);
    setModel(searchModel);
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    // URLSearchParams API 用于处理 URL 之中的查询字符串，即？之后的部分(即参数部分)。
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer selected={searchManufacturer} setSelected={setsearchManufacturer} />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image src="/model-icon.png" alt="car model" width={25} height={25} className="absolute w-[20px] h-[20px] ml-4" />
        <input type="text" name="model" value={searchModel} placeholder="Tiguan" onChange={(e) => setsearchModel(e.target.value)} className="searchbar__input" />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;