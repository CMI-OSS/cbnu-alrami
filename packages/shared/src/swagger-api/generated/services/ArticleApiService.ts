/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateArticleDto } from '../models/CreateArticleDto';
import type { MutationResponse } from '../models/MutationResponse';
import type { ResponseArticleDetailDto } from '../models/ResponseArticleDetailDto';
import type { ResponseArticleDto } from '../models/ResponseArticleDto';
import type { UpdateArticleDto } from '../models/UpdateArticleDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ArticleApiService {

    /**
     * 게시물 생성
     * @returns MutationResponse 게시물이 정상적으로 작성된 경우
     * @throws ApiError
     */
    public static articleControllerCreate({
        requestBody,
    }: {
        requestBody: CreateArticleDto,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/article',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 북마크한 게시물 조회
     * @returns ResponseArticleDto
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
         * user uuid
         */
        uuid?: string,
    }): CancelablePromise<Array<ResponseArticleDto>> {
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
     * @returns ResponseArticleDto
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
         * user uuid
         */
        uuid?: string,
    }): CancelablePromise<Array<ResponseArticleDto>> {
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
         * user uuid
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
     * @returns MutationResponse
     * @throws ApiError
     */
    public static articleControllerUpdate({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: UpdateArticleDto,
    }): CancelablePromise<MutationResponse> {
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
         * user uuid
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
         * user uuid
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

}
