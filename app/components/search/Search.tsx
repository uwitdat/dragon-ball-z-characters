import { Link } from "@remix-run/react";
import React, { useEffect } from "react";

interface SearchProps {
  result: [] | undefined;
  search: string;
}

const Search: React.FC<SearchProps> = ({ result, search }) => {
  useEffect(() => {
    if (search === "") {
      result = [];
    }
  }, [result]);
  return (
    <ul>
      {result && search !== "" ? (
        result.length > 0 ? (
          result.map(({ name, id }) => (
            <Link to={`/characters/${id}`} key={id}>
              <li>{name}</li>
            </Link>
          ))
        ) : (
          <p>No match</p>
        )
      ) : null}
    </ul>
  );
};

export default Search;
