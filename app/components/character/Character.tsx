import React from "react";
import { CharacterProps } from "~/types";
import { Link } from "@remix-run/react";
import GOKU_ICON from "~/assets/goku-icon.svg";

const Character: React.FC<CharacterProps> = ({ character, pageNum }) => {
  const { id, name, sprite } = character;

  return (
    <li key={id} className="p-3 inline rounded-3xl border-4 border-dark bg-lav">
      <div className="flex flex-col items-center bg-white p-3 rounded-2xl mb-8 font-prim shadow-custom relative">
        <h1 className="tracking-wide pb-3 text-4xl text-dark stroke-custom">
          {name}
        </h1>

        <img
          src={sprite}
          alt={`Dbz character named ${name}`}
          className="w-80 h-80 object-cover rounded-3xl"
        />
        <div className="bg-black w-80 h-80 object-cover rounded-3xl grid place-items-center absolute bottom-3 img-hover">
          <Link to={`/characters/${id}?fromPage=${pageNum}`}>
            <div className="flex flex-col items-center">
              <img src={GOKU_ICON} className="w-32" />
              <p className="text-white mt-3">View More</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-white mt-3 p-2 rounded-b-3xl rounded-t-md">
        <Link to={`/characters/${id}`}>
          <button className="hover:bg-black tracking-wide bg-dark p-3 py-4 rounded-b-3xl rounded-t-md w-full font-prim text-2xl text-lav">
            View More
          </button>
        </Link>
      </div>
    </li>
  );
};

export default Character;
