import { ApiProperty } from "@nestjs/swagger";
import { UpdatableCommonEntity } from "src/common/entity";

import { Article } from "./entities/article.entity";

type ArticleProperty = Record<
  Exclude<keyof Article, keyof UpdatableCommonEntity>,
  () => PropertyDecorator
>;

export const ArticleProperty: ArticleProperty = {
  title: () =>
    ApiProperty({
      description: "게시물 제목",
      example: " 2022학년도 동계 글로벌프론티어 단기연수 참가 선발 안내",
    }),
  content: () =>
    ApiProperty({
      description: "게시물 내용(html)",
      example:
        "<div>2022학년도 동계 글로벌프론티어 단기연수 참가자를 다음과 같이 안내드립니다.</div>",
    }),
  url: () =>
    ApiProperty({
      description: "스크래핑한 공지사항의 실제 URL",
      example: "https://software.cbnu.ac.kr/sub0401/13664",
      required: false,
    }),
  dateTime: () =>
    ApiProperty({ description: "공지사항이 작성된 시간", example: new Date() }),
  board: () => ApiProperty({ description: "게시물이 속한 게시판" }),
  author: () => ApiProperty({ description: "게시물 작성자" }),
};

export default ArticleProperty;
