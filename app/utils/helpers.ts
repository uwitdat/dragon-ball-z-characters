export function paginate(array: [], postsPerPage: number) {
  let paginatedList = [];
  let iterations = Math.ceil(array.length / postsPerPage);
  let start = 0;
  let end = postsPerPage;
  let page = 1;

  while (iterations) {
    let next;
    const posts = array.slice(start, end);
    if (iterations === 1) {
      next = false;
    } else {
      next = true;
    }
    const postsObj = { page, posts, next };
    paginatedList.push(postsObj);
    page++;
    start = start + postsPerPage;
    end = end + postsPerPage;
    iterations--;
  }
  return paginatedList;
}
