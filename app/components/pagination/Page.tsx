import React, { useState, useMemo } from "react";
import { CharacterObj } from "~/types";
import Character from "~/components/character";
import SearchFilters from "../search-filters";
import { PageProps } from "~/types";
import Search from "~/components/search";
import { useFetcher } from "@remix-run/react";
import { AiOutlineSearch } from "react-icons/ai";

const Page: React.FC<PageProps> = ({ chars, races, genders }) => {
  const [activeFilters, setActiveFilters] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const [filterRaceValue, setFilterRaceValue] = useState<{
    [key: string]: boolean;
  }>({});
  const [filterGenderValue, setFilterGenderValue] = useState<string | null>(
    null
  );

  const handleSetRaceFilter = (value: string) => {
    const raceFiltersClone = { ...filterRaceValue };

    if (filterRaceValue[value]) {
      delete raceFiltersClone[value];
      setFilterRaceValue(raceFiltersClone);
      decrementActiveFilters();
    } else {
      raceFiltersClone[value] = true;
      setFilterRaceValue(raceFiltersClone);
      incrementActiveFilters();
    }
  };

  const handleSetGenderFilter = (value: string) => {
    if (filterGenderValue === value) {
      setFilterGenderValue(null);
      decrementActiveFilters();
    } else {
      if (filterGenderValue) {
        setFilterGenderValue(value);
      } else {
        setFilterGenderValue(value);
        incrementActiveFilters();
      }
    }
  };

  const incrementActiveFilters = () => setActiveFilters(activeFilters + 1);
  const decrementActiveFilters = () => setActiveFilters(activeFilters - 1);

  const dbzChars = useMemo<CharacterObj[]>(() => {
    if (chars && filterGenderValue && Object.keys(filterRaceValue).length) {
      return chars.filter((char: CharacterObj) =>
        char.race
          ? filterRaceValue[char.race] && char.gender === filterGenderValue
          : char.gender === filterGenderValue
      );
    } else if (
      chars &&
      filterGenderValue &&
      !Object.keys(filterRaceValue).length
    ) {
      return chars.filter(
        (char: CharacterObj) => char.gender === filterGenderValue
      );
    } else if (
      chars &&
      !filterGenderValue &&
      Object.keys(filterRaceValue).length
    ) {
      return chars.filter((char: CharacterObj) =>
        char.race ? filterRaceValue[char.race] : null
      );
    } else {
      return chars;
    }
  }, [chars, filterGenderValue, filterRaceValue]);

  const fetcher = useFetcher();

  const handleSearch = async (value: string) => {
    if (value === "") {
      setSearch("");
      fetcher.data = undefined;
    } else {
      setSearch(value);
      fetcher.load(`/query?q=${value}`);
    }
  };

  return (
    <div>
      <div className="flex py-4 px-10">
        <SearchFilters
          activeFilters={activeFilters}
          races={races}
          genders={genders}
          handleSetRaceFilter={handleSetRaceFilter}
          handleSetGenderFilter={handleSetGenderFilter}
          filterGenderValue={filterGenderValue}
          filterRaceValue={filterRaceValue}
        />
        <div className="ml-4 border px-2 w-80 rounded-md flex items-center relative">
          <AiOutlineSearch className="text-lg" style={{ opacity: ".3" }} />
          <input
            className="w-full h-full p-2 outline-none"
            placeholder="Search characters"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e.target.value)
            }
            value={search}
          />
        </div>
      </div>
      {search.length > 0 && <Search result={fetcher.data} />}
      {dbzChars.length ? (
        <ul className="relative flex flex-wrap gap-4 p-5 justify-evenly">
          {dbzChars.map((character: CharacterObj) => (
            <Character character={character} key={character.id} />
          ))}
        </ul>
      ) : (
        <div className="grid place-items-center">
          <h5 className="py-64 font-prim text-3xl">No results found.</h5>
        </div>
      )}
    </div>
  );
};

export default Page;
