import { IsNumber, IsOptional } from "class-validator";

export class PageRequest {
  // DESCRIBE: 요청 페이지 인덱스. 디폴트 1
  @IsNumber()
  @IsOptional()
  pageNo?: number | 1;

  // DESCRIBE: 한 페이지에 나올 데이터 수. 디폴트 4
  @IsNumber()
  @IsOptional()
  pageSize?: number | 5;

  getOffset(): number {
    if (this.pageNo < 1 || this.pageNo === undefined || this.pageNo === null) {
      this.pageNo = 1;
    }

    if (
      this.pageSize < 1 ||
      this.pageSize === undefined ||
      this.pageSize === null
    ) {
      this.pageSize = 5;
    }

    return (this.pageNo - 1) * this.pageSize;
  }

  getLimit(): number {
    if (
      this.pageSize < 1 ||
      this.pageSize === undefined ||
      this.pageSize === null
    ) {
      this.pageSize = 5;
    }
    return this.pageSize;
  }
}
