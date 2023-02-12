/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Admin } from './Admin';
import type { Board } from './Board';
import type { Image } from './Image';

export type ResponseArticleDetailDto = {
    /**
     * 아이디
     */
    id: number;
    /**
     * 생성 시간
     */
    createdDateTime: string;
    /**
     * 수정 시간
     */
    updatedDateTime: string;
    /**
     * 게시물 제목
     */
    title: string;
    /**
     * 게시물 내용(html)
     */
    content: string;
    /**
     * 스크래핑한 공지사항의 실제 URL
     */
    url?: string;
    /**
     * 공지사항이 작성된 시간
     */
    dateTime: string;
    /**
     * 조회수
     */
    viewCount: number;
    /**
     * 북마크 수
     */
    bookmarkCount: number;
    /**
     * 게시물이 속한 게시판
     */
    board: Board;
    /**
     * 게시물 작성자
     */
    author: Admin;
    /**
     * 게시물 이미지
     */
    images?: Array<Image>;
    /**
     * 북마크 여부
     */
    isBookmark: boolean;
    /**
     * 조회 여부
     */
    isView: boolean;
};

