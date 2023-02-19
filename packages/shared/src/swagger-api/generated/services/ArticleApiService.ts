/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticleMutationResponseDto } from '../models/ArticleMutationResponseDto';
import type { CreateArticleDto } from '../models/CreateArticleDto';
import type { MutationResponse } from '../models/MutationResponse';
import type { ResponseArticleDetailDto } from '../models/ResponseArticleDetailDto';
import type { ResponseArticlePageDto } from '../models/ResponseArticlePageDto';
import type { UpdateArticleDto } from '../models/UpdateArticleDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ArticleApiService {

    /**
     * 게시물 생성
     * @returns ArticleMutationResponseDto 게시물이 정상적으로 작성된 경우
     * @throws ApiError
     */
    public static articleControllerCreate({
        requestBody,
    }: {
        requestBody: CreateArticleDto,
    }): CancelablePromise<ArticleMutationResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/article',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 북마크한 게시물 조회
     * @returns ResponseArticlePageDto
     * @throws ApiError
     */
    public static articleControllerFindBookmarkArticle({
        page = 1,
        count = 10,
        uuid,
    }: {
        /**
         * 페이지
         */
        page?: number,
        /**
         * 아이템 개수
         */
        count?: number,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<ResponseArticlePageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/article/bookmark',
            headers: {
                'uuid': uuid,
            },
            query: {
                'page': page,
                'count': count,
            },
        });
    }

    /**
     * 구독한 게시판중 최신 게시물순 조회
     * @returns ResponseArticlePageDto
     * @throws ApiError
     */
    public static articleControllerFindSubscribeArticle({
        page = 1,
        count = 10,
        uuid,
    }: {
        /**
         * 페이지
         */
        page?: number,
        /**
         * 아이템 개수
         */
        count?: number,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<ResponseArticlePageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/article/subscribe',
            headers: {
                'uuid': uuid,
            },
            query: {
                'page': page,
                'count': count,
            },
        });
    }

    /**
     * 인기 공지사항 조회 API
     * 조회수와 공지사항 등록일을 이용, 최근 2주 동안 제일 인기가 많은순으로 정렬하여 제공
     * @returns ResponseArticlePageDto
     * @throws ApiError
     */
    public static articleControllerFindPopularArticles({
        page = 1,
        count = 10,
    }: {
        /**
         * 페이지
         */
        page?: number,
        /**
         * 아이템 개수
         */
        count?: number,
    }): CancelablePromise<ResponseArticlePageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/article/popular',
            query: {
                'page': page,
                'count': count,
            },
        });
    }

    /**
     * 게시물 조회
     * @returns ResponseArticleDetailDto
     * @throws ApiError
     */
    public static articleControllerFindOne({
        id,
        uuid,
    }: {
        id: number,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<ResponseArticleDetailDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/article/{id}',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 게시물 수정
     * @returns ArticleMutationResponseDto
     * @throws ApiError
     */
    public static articleControllerUpdate({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: UpdateArticleDto,
    }): CancelablePromise<ArticleMutationResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/article/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 게시물 삭제
     * @returns MutationResponse
     * @throws ApiError
     */
    public static articleControllerRemove({
        id,
    }: {
        id: number,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/article/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * 북마크 설정
     * @returns MutationResponse
     * @throws ApiError
     */
    public static articleControllerBookmark({
        id,
        uuid,
    }: {
        id: number,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/article/{id}/bookmark',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 북마크 해제
     * @returns MutationResponse
     * @throws ApiError
     */
    public static articleControllerUnbookmark({
        id,
        uuid,
    }: {
        id: number,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/article/{id}/bookmark',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 공지사항 좋아요 추가
     * @returns MutationResponse
     * @throws ApiError
     */
    public static articleControllerLike({
        id,
        uuid,
    }: {
        id: number,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/article/{id}/like',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 공지사항 좋아요 취소
     * @returns MutationResponse
     * @throws ApiError
     */
    public static articleControllerUndoLike({
        id,
        uuid,
    }: {
        id: number,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/article/{id}/like',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

}
