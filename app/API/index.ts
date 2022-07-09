import { db } from "~/utils/db.server";
import { TableData, CharacterObj, FetchObject } from "~/types";

export async function fetchTableData(): Promise<TableData> {
  try {
    const characters = await db.character.findMany({
      select: {
        race: true,
        gender: true,
      },
    });
    const races = [...new Set(characters.map((char) => char.race))];
    const genders = [...new Set(characters.map((char) => char.gender))];

    return { races, genders };
  } catch (err: any) {
    return err.message;
  }
}

export async function fetchCharacters(): Promise<FetchObject> {
  try {
    const characters = await db.character.findMany({
      orderBy: { id: "asc" },
    });
    const lastEntry = characters[characters.length - 1].id;
    const next = await checkNext(lastEntry);

    const data = {
      characters,
      next,
    };
    return data;
  } catch (err: any) {
    return err.message;
  }
}

export async function fetchMoreCharacters(
  count: number,
  cursor: string | null | any
): Promise<FetchObject> {
  try {
    const characters = await db.character.findMany({
      take: count,
      skip: 1,
      orderBy: { id: "asc" },
      cursor: {
        id: cursor,
      },
    });
    const lastEntry = characters[characters.length - 1].id;
    const next = await checkNext(lastEntry);

    const data = {
      characters,
      next,
    };
    return data;
  } catch (err: any) {
    return err.message;
  }
}

export async function fetchOne(
  id: string | undefined
): Promise<CharacterObj | null> {
  try {
    const character = await db.character.findUnique({
      where: { id },
    });
    return character;
  } catch (err: any) {
    return err.message;
  }
}

export async function checkNext(cursor: string) {
  try {
    const character = await db.character.findMany({
      take: 1,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursor,
      },
    });
    if (character[0]) return character[0].id;

    return null;
  } catch (err: any) {
    return err.message;
  }
}
