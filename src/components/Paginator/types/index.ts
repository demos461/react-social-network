export type PaginatorPropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (num: number) => void;
  portionSize: number;
};
