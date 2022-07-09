import { Link } from "@remix-run/react";
import React from "react";
import { SearchProps } from "~/types";

const Search: React.FC<SearchProps> = ({ result }) => {
  return (
    <ul>
      {result &&
        (result.length > 0 ? (
          result.map(({ name, id }) => (
            <Link to={`/characters/${id}`} key={id}>
              <li>{name}</li>
            </Link>
          ))
        ) : (
          <p>No matches found.</p>
        ))}
    </ul>
  );
};

export default Search;
