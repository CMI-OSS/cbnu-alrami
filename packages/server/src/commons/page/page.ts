import { PageRequest } from "./page.request";

export class Page {
  // 마지막 페이지 확인 플래그
  isEnd: boolean;
  totalItemCount: number;
  totalPageCount: number;

  constructor(pageRequest: PageRequest, totalItemCount: number) {
    const currentPageNo = pageRequest.pageNo;
    const totalPageCount = Math.ceil(totalItemCount / pageRequest.pageSize);
    this.isEnd = currentPageNo >= totalPageCount;
    this.totalItemCount = totalItemCount;
    this.totalPageCount = totalPageCount;
  }
}
