import React from "react";
import { fetchOne } from "~/API";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
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

export default Name;
