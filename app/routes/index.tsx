import React from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { CharacterObj, CharacterData, PaginatedChars } from "~/types";
import { fetchCharacters, fetchTableData, searchChars } from "~/API";
import { paginate } from "../utils/helpers.js";
import { Page, PageNavigation } from "~/components/pagination";
import { useFetcher } from "@remix-run/react";
import Search from "~/components/search";

export const loader: LoaderFunction = async (): Promise<
  CharacterData | any
> => {
  let data;

  try {
    const charactersData = await fetchCharacters();
    const { characters, next } = charactersData;
    const { races, genders } = await fetchTableData();

    data = { characters, races, genders, next };
  } catch (err: any) {
    console.log(err.message);
  }
  return data;
};

const Landing: React.FC = () => {
  const CHARS_PER_PAGE = 6;
  const fetcher = useFetcher();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  let { characters, races, genders } = useLoaderData();

  const paginatedChars: PaginatedChars[] = paginate(characters, CHARS_PER_PAGE);
  const lastPageNumber = paginatedChars[paginatedChars.length - 1].page;
  const pages = paginatedChars.map((data) => data.page);

  const handleSearch = async (value: string) => {
    if (value === "") {
      setSearch("");
      fetcher.data = undefined;
    } else {
      setSearch(value);
      fetcher.load(`/query?q=${value}`);
    }
  };

  return (
    <div>
      <input
        placeholder="Search a character..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
        value={search}
      />
      {search.length > 0 && <Search result={fetcher.data} />}

      <Page
        chars={paginatedChars[currentPage - 1].posts}
        races={races}
        genders={genders}
        pageNum={currentPage}
      />
      <PageNavigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPageNumber={lastPageNumber}
        pages={pages}
      />
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
