import React from "react";

interface PageNavProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  lastPageNumber: number;
  pages: number[];
}

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
