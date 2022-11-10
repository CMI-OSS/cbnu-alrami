import { ApiPropertyOptions } from "@nestjs/swagger";

type ArticleSwagger = Record<
  "title" | "content" | "url" | "dateTime" | "boardId" | "board" | "author",
  ApiPropertyOptions
>;

const articleSwagger: ArticleSwagger = {
  title: {
    description: "게시물 제목",
    example: " 2022학년도 동계 글로벌프론티어 단기연수 참가 선발 안내",
  },
  content: {
    description: "게시물 내용(html)",
    example:
      "<div>2022학년도 동계 글로벌프론티어 단기연수 참가자를 다음과 같이 안내드립니다.</div>",
  },
  url: {
    description: "스크래핑한 공지사항의 실제 URL",
    example: "https://software.cbnu.ac.kr/sub0401/13664",
    required: false,
  },
  dateTime: { description: "공지사항이 작성된 시간", example: new Date() },
  boardId: { description: "게시물이 속한 게시판의 ID", example: 1 },
  board: { description: "게시물이 속한 게시판" },
  author: { description: "게시물 작성자" },
};

export default articleSwagger;
