import React from "react";

interface SearchFiltersProps {
  races: string[];
  genders: string[];
  handleSetRaceFilter: (value: string) => void;
  handleSetGenderFilter: (value: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  races,
  genders,
  handleSetRaceFilter,
  handleSetGenderFilter,
}) => {
  return (
    <div>
      <h3>Filters:</h3>
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
    </div>
  );
};

export default SearchFilters;
