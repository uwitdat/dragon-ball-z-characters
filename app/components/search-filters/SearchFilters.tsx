import React, { useState } from "react";
import { SearchFiltersProps } from "~/types";

const SearchFilters: React.FC<SearchFiltersProps> = ({
  races,
  genders,
  handleSetRaceFilter,
  handleSetGenderFilter,
  activeFilters,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="font-prim border bg-lav w-32 flex justify-between text-lg py-1 px-2 rounded-lg items-center"
      >
        <span className="text-sm">&#9776;</span>
        Filters: <p className="text-dark text-lg">{activeFilters}</p>
      </button>
      {showMenu ? (
        <React.Fragment>
          <h5>Race:</h5>
          {races.map((race: string) => (
            <p
              className="inline"
              key={race}
              onClick={() => handleSetRaceFilter(race)}
            >
              {" "}
              {race}
            </p>
          ))}
          <h5>Gender:</h5>
          {genders.map((gender: string) => (
            <p
              className="inline"
              key={gender}
              onClick={() => handleSetGenderFilter(gender)}
            >
              {" "}
              {gender}
            </p>
          ))}
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default SearchFilters;
