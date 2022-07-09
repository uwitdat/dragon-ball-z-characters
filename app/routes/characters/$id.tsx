import React from "react";
import { fetchOne } from "~/API";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { CharacterObj } from "~/types";

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
  const { name, sprite, race, gender, specialMove }: CharacterObj = character;

  return (
    <section>
      <h1>{name}</h1>
      <img src={sprite} className="w-80 h-80 object-cover rounded-lg" />
      <p>Race: {race}</p>
      <p>Gender: {gender}</p>
      <p>Special Move: {specialMove || "None"}</p>
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
  };
};

export default Name;
