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
     * @param requestBody
     * @returns MutationResponse 게시물이 정상적으로 작성된 경우
     * @throws ApiError
     */
    public static articleControllerCreate(
        requestBody: CreateArticleDto,
    ): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/article',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 북마크한 게시물 조회
     * @param uuid user uuid
     * @returns ResponseArticleDto
     * @throws ApiError
     */
    public static articleControllerFindBookmarkArticle(
        uuid?: string,
    ): CancelablePromise<Array<ResponseArticleDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/article/bookmark',
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 게시물 조회
     * @param id
     * @param uuid user uuid
     * @returns ResponseArticleDetailDto
     * @throws ApiError
     */
    public static articleControllerFindOne(
        id: number,
        uuid?: string,
    ): CancelablePromise<ResponseArticleDetailDto> {
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
     * @param id
     * @param requestBody
     * @returns MutationResponse
     * @throws ApiError
     */
    public static articleControllerUpdate(
        id: number,
        requestBody: UpdateArticleDto,
    ): CancelablePromise<MutationResponse> {
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
     * @param id
     * @returns MutationResponse
     * @throws ApiError
     */
    public static articleControllerRemove(
        id: number,
    ): CancelablePromise<MutationResponse> {
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
     * @param id
     * @param uuid user uuid
     * @returns MutationResponse
     * @throws ApiError
     */
    public static articleControllerBookmark(
        id: number,
        uuid?: string,
    ): CancelablePromise<MutationResponse> {
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
     * @param id
     * @param uuid user uuid
     * @returns MutationResponse
     * @throws ApiError
     */
    public static articleControllerUnbookmark(
        id: number,
        uuid?: string,
    ): CancelablePromise<MutationResponse> {
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
