import React, { useState, useMemo } from "react";
import { CharacterObj } from "~/types";
import Character from "~/components/character";
import SearchFilters from "../search-filters";

interface PageProps {
  chars: CharacterObj[];
  races: string[];
  genders: string[];
  pageNum: number;
}

const Page: React.FC<PageProps> = ({ chars, races, genders, pageNum }) => {
  const [filterRaceValue, setFilterRaceValue] = useState<string | null>(null);
  const [filterGenderValue, setFilterGenderValue] = useState<string | null>(
    null
  );

  const handleSetRaceFilter = (value: string) => {
    if (filterRaceValue === value) {
      setFilterRaceValue(null);
    } else {
      setFilterRaceValue(value);
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
    if (chars && filterGenderValue && filterRaceValue) {
      return chars.filter(
        (char: CharacterObj) =>
          char.race === filterRaceValue && char.gender === filterGenderValue
      );
    } else if (chars && filterGenderValue && !filterRaceValue) {
      return chars.filter(
        (char: CharacterObj) => char.gender === filterGenderValue
      );
    } else if (chars && !filterGenderValue && filterRaceValue) {
      return chars.filter(
        (char: CharacterObj) => char.race === filterRaceValue
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
        <ul className="relative flex flex-wrap gap-4 p-5">
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
