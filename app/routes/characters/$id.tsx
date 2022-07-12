import React from "react";
import { fetchOne } from "~/API";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { CharacterObj } from "~/types";
import { Link } from "@remix-run/react";
import useMediaQuery from "~/hooks/useMediaQuery";

export const loader: LoaderFunction = async ({
  params,
}): Promise<CharacterObj | any> => {
  let data;

  try {
    const character = await fetchOne(params.id);
    data = { character };
  } catch (err: any) {
    console.log(err.message);
  }
  return data;
};

const Name: React.FC = () => {
  const { character } = useLoaderData();

  const {
    name,
    race,
    gender,
    specialMove,
    spriteLrg,
    description,
  }: CharacterObj = character;

  const isMobile = useMediaQuery("(max-width: 900px)");

  const mobileClass = "flex flex-col items-center relative";
  const sectionClass = "flex flex-wrap w-full h-screen relative";

  const mobileClassTable = "w-full p-10 -mt-8";
  const tableClass = "w-6/12 h-4/5 p-5 pt-52 pr-20";

  return (
    <section className={isMobile ? mobileClass : sectionClass}>
      <div className="w-6/12 h-4/5 p-5 flex flex-col items-center">
        <h1 className="font-prim text-dark text-6xl my-5">{name}</h1>
        <img
          src={spriteLrg}
          className="w-full h-full object-contain overflow-hidden"
        />
      </div>

      <div className={isMobile ? mobileClassTable : tableClass}>
        <section>
          <div className="w-full text-center border border-dark p-2 bg-gray-200">
            <p className="text-3xl font-prim">Description</p>
          </div>
          <div className="p-8 border-l border-r border-dark text-center">
            <p className="text-lg leading-none text-dark">{description}</p>
          </div>
          <div className="flex w-full border border-dark p-1 bg-gray-200 font-prim">
            <div className="w-1/2 text-center border-r border-dark">
              <p className="text-2xl">Race</p>
            </div>
            <div className="w-1/2 text-center">
              <p className="text-2xl">{race}</p>
            </div>
          </div>
          <div className="flex w-full border-r border-l border-b border-dark p-1 font-prim">
            <div className="w-1/2 text-center border-r border-dark">
              <p className="text-2xl">Gender</p>
            </div>
            <div className="w-1/2 text-center">
              <p className="text-2xl">{gender}</p>
            </div>
          </div>
          <div className="flex w-full border-r border-l border-b border-dark bg-gray-200 p-1 font-prim">
            <div className="w-1/2 text-center border-r border-dark">
              <p className="text-2xl">Special</p>
            </div>
            <div className="w-1/2 text-center">
              <p className="text-2xl">{specialMove || " "}</p>
            </div>
          </div>
        </section>
      </div>
      <Link to="/">
        <button className="absolute top-2 left-4 text-3xl font-prim text-gray-500">
          ←
        </button>
      </Link>
    </section>
  );
};

export const meta: MetaFunction = ({ data }) => {
  const { character } = data;

  return {
    charset: "utf-8",
    description: `More details about DBZ character ${character.name}`,
    title: `DBZ Character ${character.name}`,
    viewport: "width=device-width,initial-scale=1",
    keywords: [
      character.name,
      character.gender,
      character.race,
      character.description,
      character.specialMove,
    ],
  };
};

export default Name;
