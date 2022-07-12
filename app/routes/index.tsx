import React, { useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { CharacterObj, CharacterData, PaginatedChars } from "~/types";
import { fetchCharacters, fetchTableData } from "~/API";
import { Page, PageNavigation } from "~/components/pagination";

export const loader: LoaderFunction = async ({
  request,
}): Promise<CharacterData | any> => {
  let data;

  const url = new URL(request.url);
  const page = url.searchParams.get("page");

  try {
    const charactersData = await fetchCharacters();
    const { characters, next } = charactersData;
    const { races, genders } = await fetchTableData();

    data = { characters, races, genders, next, page };
  } catch (err: any) {
    console.log(err.message);
  }
  return data;
};

const Landing: React.FC = () => {
  let { characters, races, genders, page } = useLoaderData();

  const [currentPage, setCurrentPage] = useState<number>(
    page ? Number(page) : 1
  );

  const lastPageNumber = characters[characters.length - 1].page;
  const pages = characters.map((data: PaginatedChars) => data.page);

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }
  }, [page]);

  return (
    <div>
      <Page
        chars={characters[currentPage - 1].posts}
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
