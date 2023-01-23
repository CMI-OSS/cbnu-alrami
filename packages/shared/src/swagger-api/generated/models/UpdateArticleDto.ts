/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateArticleDto = {
    /**
     * 게시물 제목
     */
    title?: string;
    /**
     * 게시물 내용(html)
     */
    content?: string;
    /**
     * 스크래핑한 공지사항의 실제 URL
     */
    url?: string;
    /**
     * 공지사항이 작성된 시간
     */
    dateTime?: string;
    /**
     * 게시물이 속한 게시판의 ID
     */
    boardId?: number;
    /**
     * 이미지
     */
    imageIds?: Array<number>;
};

