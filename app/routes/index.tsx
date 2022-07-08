import React from "react";
import type { MetaFunction } from "@remix-run/node";
import { useState, useMemo } from "react";
import { useLoaderData } from "@remix-run/react";
import Character from "~/components/character";
import { CharacterObj, CharacterData } from "~/types";
import { fetchCharacters, fetchTableData } from "~/API";

export const loader = async (): Promise<CharacterData | any> => {
  let data;

  try {
    const characters = await fetchCharacters();
    const { races, genders } = await fetchTableData();
    data = { characters, races, genders };
  } catch (err: any) {
    console.log(err.message);
  }
  return data;
};

const Landing: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { characters, races, genders } = useLoaderData();

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

  const dbzCharacters = useMemo<CharacterObj[]>(() => {
    if (filterGenderValue && filterRaceValue) {
      return characters.filter(
        (char: CharacterObj) =>
          char.race === filterRaceValue && char.gender === filterGenderValue
      );
    } else if (filterGenderValue && !filterRaceValue) {
      return characters.filter(
        (char: CharacterObj) => char.gender === filterGenderValue
      );
    } else if (!filterGenderValue && filterRaceValue) {
      return characters.filter(
        (char: CharacterObj) => char.race === filterRaceValue
      );
    } else {
      return characters;
    }
  }, [filterGenderValue, filterRaceValue]);

  const dbzCharsFilterByName = useMemo<CharacterObj[]>(() => {
    return search.length > 0 && dbzCharacters
      ? dbzCharacters.filter(({ name }: CharacterObj) =>
          name!.toLowerCase().includes(search.toLowerCase())
        )
      : dbzCharacters;
  }, [search, dbzCharacters]);

  return (
    <div>
      <input
        placeholder="Search a character..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
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

      {dbzCharsFilterByName.length ? (
        <ul className="relative flex flex-wrap gap-4 p-5">
          {dbzCharsFilterByName.map((character: CharacterObj) => (
            <Character character={character} key={character.id} />
          ))}
        </ul>
      ) : (
        <h5>No match found.</h5>
      )}
    </div>
  );
};

export const meta: MetaFunction = ({ data }) => {
  const { characters } = data;
  const keywords = characters.map(({ name }: CharacterObj) => name).join(", ");

  return {
    charset: "utf-8",
    description: "A Dragon Ball Z Character Index",
    title: "DBZ Characters",
    viewport: "width=device-width,initial-scale=1",
    keywords,
  };
};

export default Landing;
