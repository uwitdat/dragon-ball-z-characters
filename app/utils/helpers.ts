import { CharacterObj } from "~/types";

export function paginate(array: CharacterObj[], postsPerPage: number) {
  let paginatedList = [];
  let iterations = Math.ceil(array.length / postsPerPage);
  let start = 0;
  let end = postsPerPage;
  let page = 1;

  while (iterations) {
    const posts = array.slice(start, end);
    const postsObj = { page, posts };

    paginatedList.push(postsObj);
    page++;
    start = start + postsPerPage;
    end = end + postsPerPage;
    iterations--;
  }
  return paginatedList;
}
