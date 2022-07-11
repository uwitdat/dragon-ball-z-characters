import { Link } from "@remix-run/react";
import React from "react";
import { SearchProps } from "~/types";

const Search: React.FC<SearchProps> = ({ result }) => {
  return (
    <ul className="absolute z-10 bg-white border p-3 mt-2 w-56 text-center left-48 -mt-2">
      <h2 className="font-prim text-3xl text-dark border-b border-gray-200">
        Results
      </h2>
      {result &&
        (result.length > 0 ? (
          result.map(({ name, id }) => (
            <Link to={`/characters/${id}`} key={id}>
              <li className="hover:bg-gray-200 block my-2 pl-3 py-1 font-prim text-dark w-full text-lg">
                {name}
              </li>
            </Link>
          ))
        ) : (
          <p className="block my-2 pl-3 py-1 font-prim text-dark w-full text-lg">
            No matches found.
          </p>
        ))}
    </ul>
  );
};

export default Search;
