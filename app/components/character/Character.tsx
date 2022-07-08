import React from "react";
import { CharacterObj } from "~/types";
import { Link } from "@remix-run/react";

interface CharacterProps {
  character: CharacterObj;
}

const Character: React.FC<CharacterProps> = ({ character }) => {
  const { id, name, sprite } = character;

  return (
    <li
      style={{
        backgroundColor: "rgba(255, 255, 255, .15)",
        padding: "2rem",
        backdropFilter: "blur(5px)",
      }}
      key={id}
      className="inline rounded-lg"
    >
      <h1>{name}</h1>
      <Link to={`/characters/${id}`}>
        <img src={sprite} className="w-80 h-80 object-cover rounded-lg" />
      </Link>
    </li>
  );
};

export default Character;
