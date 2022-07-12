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
  spriteLrg: string;
  description: string;
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

export interface FetchObject {
  characters: PaginatedChars[];
  next: string | null;
}

export interface PaginatedChars {
  posts: CharacterObj[];
  page: number;
}

/* =====================================
================= PROPS ================
======================================== */
export interface SearchFiltersProps {
  races: string[];
  genders: string[];
  handleSetRaceFilter: (value: string) => void;
  handleSetGenderFilter: (value: string) => void;
  activeFilters: number;
  filterGenderValue: string | null;
  filterRaceValue: { [key: string]: boolean };
}

export interface PageProps {
  chars: CharacterObj[];
  races: string[];
  genders: string[];
  pageNum: number;
}

export interface CharacterProps {
  character: CharacterObj;
  pageNum: number;
}

export interface SearchProps {
  result: [] | undefined;
}

export interface PageNavProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  lastPageNumber: number;
  pages: number[];
}
