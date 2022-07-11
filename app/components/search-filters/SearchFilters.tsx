import React, { useState } from "react";
import { SearchFiltersProps } from "~/types";

const SearchFilters: React.FC<SearchFiltersProps> = ({
  races,
  genders,
  handleSetRaceFilter,
  handleSetGenderFilter,
  activeFilters,
  filterGenderValue,
  filterRaceValue,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="font-prim border bg-lav w-32 flex justify-between text-lg py-1 px-2 rounded-lg items-center"
      >
        <span className="text-sm">&#9776;</span>
        Filters: <p className="text-dark text-lg">{activeFilters}</p>
      </button>
      {showMenu ? (
        <section className="absolute z-10 bg-white border p-3 mt-2 w-60">
          <div className="text-center">
            <h5 className="font-prim text-3xl text-dark border-b border-gray-200">
              Race
            </h5>
          </div>

          {races.map((race: string) => (
            <button
              className={
                filterRaceValue[race]
                  ? "block my-2 bg-gray-200 pl-3 py-1 font-prim text-dark w-full text-lg"
                  : "block my-2 pl-3 py-1 font-prim text-dark w-full text-lg"
              }
              key={race}
              onClick={() => handleSetRaceFilter(race)}
            >
              {" "}
              {race}
            </button>
          ))}
          <div className="text-center">
            <h5 className="font-prim text-3xl mt-5 text-dark border-b border-gray-200">
              Gender
            </h5>
          </div>
          {genders.map((gender: string) => (
            <button
              className={
                gender === filterGenderValue
                  ? "block my-2 bg-gray-200 pl-3 py-1 font-prim text-dark w-full text-lg"
                  : "block my-2 pl-3 py-1 font-prim text-dark w-full text-lg"
              }
              key={gender}
              onClick={() => handleSetGenderFilter(gender)}
            >
              {" "}
              {gender}
            </button>
          ))}
        </section>
      ) : null}
    </div>
  );
};

export default SearchFilters;
