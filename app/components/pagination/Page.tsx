import React, { useState, useMemo } from "react";
import { CharacterObj } from "~/types";
import Character from "~/components/character";
import SearchFilters from "../search-filters";
import { PageProps } from "~/types";

const Page: React.FC<PageProps> = ({ chars, races, genders }) => {
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
    } else {
      raceFiltersClone[value] = true;
      setFilterRaceValue(raceFiltersClone);
    }
  };

  const handleSetGenderFilter = (value: string) => {
    if (filterGenderValue === value) {
      setFilterGenderValue(null);
    } else {
      setFilterGenderValue(value);
    }
  };

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

  return (
    <div>
      <SearchFilters
        races={races}
        genders={genders}
        handleSetRaceFilter={handleSetRaceFilter}
        handleSetGenderFilter={handleSetGenderFilter}
      />
      {dbzChars.length ? (
        <ul className="relative flex flex-wrap gap-4 p-5 justify-evenly">
          {dbzChars.map((character: CharacterObj) => (
            <Character character={character} key={character.id} />
          ))}
        </ul>
      ) : (
        <h5>No results found.</h5>
      )}
    </div>
  );
};

export default Page;
