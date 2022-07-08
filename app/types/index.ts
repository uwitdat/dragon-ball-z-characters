export type CharacterData = {
  characters: CharacterObj[];
  races: RaceObj[];
  genders: GenderObj[];
};

export interface CharacterObj {
  id: string;
  createdAt: Date;
  name: string | null;
  gender: string | null;
  specialMove: string | null;
  race: string | null;
  sprite: string;
}

type RaceObj = {
  race: string | null;
};

type GenderObj = {
  race: string | null;
};

export interface TableData {
  races: (string | null)[];
  genders: (string | null)[];
}
