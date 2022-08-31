import { Page } from "./page";
import { PageRequest } from "./page.request";

export class PageResponse<T> {
  // 페이징 관련 정보
  pagination: Page;
  // 요청 데이터
  contents: T;
  constructor(
    pageRequest?: PageRequest,
    totalItemCount?: number,
    contents?: T,
  ) {
    if (pageRequest && totalItemCount && contents) {
      this.pagination = new Page(pageRequest, totalItemCount);
      this.contents = contents;
    } else if (contents) {
      const dummayPageRequest: PageRequest = new PageRequest(null, null);
      this.pagination = new Page(dummayPageRequest, 15);
      this.contents = contents;
    }
  }
}
