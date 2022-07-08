import { db } from "~/utils/db.server";
import { TableData, CharacterObj } from "~/types";

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

export async function fetchCharacters(): Promise<CharacterObj[]> {
  try {
    const characters = await db.character.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });
    return characters;
  } catch (err: any) {
    return err.message;
  }
}
