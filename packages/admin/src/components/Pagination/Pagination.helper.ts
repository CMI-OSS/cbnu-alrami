export const getPaginationList = (
  currentPage: number,
  displayPageCount: number,
  totalPage: number,
) => {
  const offset = Math.trunc(currentPage / (displayPageCount + 1));

  return Array(displayPageCount)
    .fill(Math.random())
    .map((_, index) => offset * displayPageCount + index + 1)
    .filter((page) => page <= totalPage);
};
