import { PageRequest } from "./page.request";

export class Page {
  // 현재 페이지 인덱스
  currentPageNo: number;
  // 현제 한 페이지 사이즈
  currentPageSize: number;
  // 현제 페이지 사이즈에서 전체 페이지 수
  totalPageCount: number;
  constructor(pageRequest: PageRequest, totalItemCount: number) {
    this.currentPageNo = pageRequest.pageNo;
    this.currentPageSize = pageRequest.pageSize;
    this.totalPageCount = Math.ceil(totalItemCount / pageRequest.pageSize);
  }
}
