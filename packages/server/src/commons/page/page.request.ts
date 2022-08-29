import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PageRequest {
  // DESCRIBE: 요청 페이지 인덱스. 디폴트 1
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    default: 1,
  })
  pageNo?: number;

  // DESCRIBE: 한 페이지에 나올 데이터 수. 디폴트 15
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    default: 15,
  })
  pageSize?: number;

  constructor(pageNo: number, pageSize: number) {
    this.pageNo =
      pageNo < 1 ||
      pageNo === undefined ||
      pageNo === null ||
      Number.isNaN(Number(pageNo))
        ? 1
        : pageNo;
    this.pageSize =
      pageSize < 1 ||
      pageSize === undefined ||
      pageSize === null ||
      Number.isNaN(Number(pageSize))
        ? 15
        : pageSize;
  }

  getOffset(): number {
    if (
      this.pageNo < 1 ||
      this.pageNo === undefined ||
      this.pageNo === null ||
      Number.isNaN(Number(this.pageNo))
    ) {
      this.pageNo = 1;
    }

    if (
      this.pageSize < 1 ||
      this.pageSize === undefined ||
      this.pageSize === null ||
      Number.isNaN(Number(this.pageSize))
    ) {
      this.pageSize = 15;
    }

    return (this.pageNo - 1) * this.pageSize;
  }

  getLimit(): number {
    if (
      this.pageSize < 1 ||
      this.pageSize === undefined ||
      this.pageSize === null ||
      Number.isNaN(Number(this.pageSize))
    ) {
      this.pageSize = 15;
    }
    return this.pageSize;
  }
}
