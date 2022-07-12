import React from "react";
import { PageNavProps } from "~/types";
import { Link } from "@remix-run/react";

const PageNavigation: React.FC<PageNavProps> = ({
  currentPage,
  // setCurrentPage,
  lastPageNumber,
  pages,
}) => {
  return (
    <nav className="flex p-7 w-full justify-center font-prim text-2xl text-dark">
      <Link to={`/?page=${currentPage - 1}`}>
        <button
          className="mr-4 border-2 border-dark px-5 pt-1"
          // onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Back
        </button>
      </Link>

      {pages.map((page: number) => (
        <Link to={`/?page=${page}`} key={page}>
          <button
            className={
              page === Number(currentPage)
                ? "px-4 bg-lav border-2 border-dark"
                : "px-4"
            }
          >
            {page}
          </button>
        </Link>
      ))}

      <Link to={`/?page=${currentPage + 1}`}>
        <button
          className="ml-4 border-2 border-dark px-5 pt-1"
          disabled={currentPage === lastPageNumber}
        >
          Next{" "}
        </button>
      </Link>
    </nav>
  );
};

export default PageNavigation;
