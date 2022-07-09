import React from "react";
import { PageNavProps } from "~/types";

const PageNavigation: React.FC<PageNavProps> = ({
  currentPage,
  setCurrentPage,
  lastPageNumber,
  pages,
}) => {
  return (
    <div className="flex">
      {currentPage === 1 ? null : (
        <p onClick={() => setCurrentPage(currentPage - 1)}>Back</p>
      )}

      {pages.map((page: number) => (
        <button onClick={() => setCurrentPage(page)} key={page}>
          {page}
        </button>
      ))}
      {currentPage === lastPageNumber ? null : (
        <p onClick={() => setCurrentPage(currentPage + 1)}>Next </p>
      )}
    </div>
  );
};

export default PageNavigation;
