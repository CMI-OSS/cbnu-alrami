/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBoardDto } from '../models/CreateBoardDto';
import type { MutationResponse } from '../models/MutationResponse';
import type { ResponseArticlePageDto } from '../models/ResponseArticlePageDto';
import type { ResponseBoardDto } from '../models/ResponseBoardDto';
import type { UpdateBoardDto } from '../models/UpdateBoardDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BoardApiService {

    /**
     * 게시판 생성
     * @returns MutationResponse 게시판이 정상적으로 작성된 경우
     * @throws ApiError
     */
    public static boardControllerCreate({
        requestBody,
    }: {
        requestBody: CreateBoardDto,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/board',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 게시판 목록 조회
     * @returns ResponseBoardDto
     * @throws ApiError
     */
    public static boardControllerFind({
        uuid,
    }: {
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<Array<ResponseBoardDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/board',
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 구독한 게시판 목록 조회
     * @returns ResponseBoardDto
     * @throws ApiError
     */
    public static boardControllerFindSubscribeBoards({
        uuid,
    }: {
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<Array<ResponseBoardDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/board/subscribe',
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 게시판 조회
     * @returns ResponseBoardDto
     * @throws ApiError
     */
    public static boardControllerFindOne({
        id,
        uuid,
    }: {
        id: number,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<ResponseBoardDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/board/{id}',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 게시판 수정
     * @returns MutationResponse
     * @throws ApiError
     */
    public static boardControllerUpdate({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: UpdateBoardDto,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/board/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 게시판 삭제
     * @returns MutationResponse
     * @throws ApiError
     */
    public static boardControllerRemove({
        id,
    }: {
        id: number,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/board/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * 게시판내 게시물 페이지 조회
     * @returns ResponseArticlePageDto
     * @throws ApiError
     */
    public static boardControllerFindArticlePage({
        id,
        page = 1,
        count = 10,
    }: {
        id: number,
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
            url: '/board/{id}/articles',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'count': count,
            },
        });
    }

    /**
     * 게시판 구독
     * @returns MutationResponse 게시판이 정상적으로 구독된 경우
     * @throws ApiError
     */
    public static boardControllerSubscribe({
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
            url: '/board/{id}/subscribe',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 게시판 구독 해제
     * @returns MutationResponse 게시판이 정상적으로 구독 해제된 경우
     * @throws ApiError
     */
    public static boardControllerUnsubscribe({
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
            url: '/board/{id}/subscribe',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 게시판 알림 설정
     * @returns MutationResponse 게시판이 정상적으로 알림 설정된 경우
     * @throws ApiError
     */
    public static boardControllerNotice({
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
            url: '/board/{id}/notice',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 게시판 알림 해제
     * @returns MutationResponse 게시판이 정상적으로 알림 해제된 경우
     * @throws ApiError
     */
    public static boardControllerUnnotice({
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
            url: '/board/{id}/notice',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

}
