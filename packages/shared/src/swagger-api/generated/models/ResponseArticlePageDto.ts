/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationResponseDto } from './PaginationResponseDto';
import type { ResponseArticleDto } from './ResponseArticleDto';

export type ResponseArticlePageDto = {
    /**
     * 페이지네이션 관련 정보
     */
    pagination: PaginationResponseDto;
    /**
     * 게시물 목록
     */
    articles: Array<ResponseArticleDto>;
};

