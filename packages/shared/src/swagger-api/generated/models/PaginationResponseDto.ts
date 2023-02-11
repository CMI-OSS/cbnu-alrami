/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PaginationResponseDto = {
    /**
     * 현재 페이지
     */
    currentPage: number;
    /**
     * 전체 페이지
     */
    totalPageCount: number;
    /**
     * 전체 아이템 개수
     */
    totalItemCount: number;
    /**
     * 마지막 페이지 여부
     */
    isEnd: boolean;
};

