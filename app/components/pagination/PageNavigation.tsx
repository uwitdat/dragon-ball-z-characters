import React from "react";
import { PageNavProps } from "~/types";

const PageNavigation: React.FC<PageNavProps> = ({
  currentPage,
  setCurrentPage,
  lastPageNumber,
  pages,
}) => {
  return (
    <nav className="flex p-7 w-full justify-center font-prim text-2xl text-dark">
      <button
        className="mr-4 border-2 border-dark px-5 pt-1"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Back
      </button>

      {pages.map((page: number) => (
        <button
          className={
            page === currentPage ? "px-4 bg-lav border-2 border-dark" : "px-4"
          }
          onClick={() => setCurrentPage(page)}
          key={page}
        >
          {page}
        </button>
      ))}

      <button
        className="ml-4 border-2 border-dark px-5 pt-1"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === lastPageNumber}
      >
        Next{" "}
      </button>
    </nav>
  );
};

export default PageNavigation;
