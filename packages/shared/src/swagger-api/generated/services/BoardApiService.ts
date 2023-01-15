/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBoardDto } from '../models/CreateBoardDto';
import type { MutationResponse } from '../models/MutationResponse';
import type { ResponseArticleDto } from '../models/ResponseArticleDto';
import type { ResponseBoardDto } from '../models/ResponseBoardDto';
import type { UpdateBoardDto } from '../models/UpdateBoardDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BoardApiService {

    /**
     * 게시판 생성
     * @param requestBody
     * @returns MutationResponse 게시판이 정상적으로 작성된 경우
     * @throws ApiError
     */
    public static boardControllerCreate(
        requestBody: CreateBoardDto,
    ): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/board',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 게시판 목록 조회
     * @param uuid user uuid
     * @returns ResponseBoardDto
     * @throws ApiError
     */
    public static boardControllerFind(
        uuid?: string,
    ): CancelablePromise<Array<ResponseBoardDto>> {
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
     * @param uuid user uuid
     * @returns ResponseBoardDto
     * @throws ApiError
     */
    public static boardControllerFindSubscribeBoards(
        uuid?: string,
    ): CancelablePromise<Array<ResponseBoardDto>> {
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
     * @param id
     * @param uuid user uuid
     * @returns ResponseBoardDto
     * @throws ApiError
     */
    public static boardControllerFindOne(
        id: number,
        uuid?: string,
    ): CancelablePromise<ResponseBoardDto> {
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
     * @param id
     * @param requestBody
     * @returns MutationResponse
     * @throws ApiError
     */
    public static boardControllerUpdate(
        id: number,
        requestBody: UpdateBoardDto,
    ): CancelablePromise<MutationResponse> {
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
     * @param id
     * @returns MutationResponse
     * @throws ApiError
     */
    public static boardControllerRemove(
        id: number,
    ): CancelablePromise<MutationResponse> {
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
     * @param id
     * @param page 페이지
     * @param count 아이템 개수
     * @returns ResponseArticleDto
     * @throws ApiError
     */
    public static boardControllerFindArticlePage(
        id: number,
        page: number = 1,
        count: number = 10,
    ): CancelablePromise<Array<ResponseArticleDto>> {
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
     * @param id
     * @param uuid user uuid
     * @returns MutationResponse 게시판이 정상적으로 구독된 경우
     * @throws ApiError
     */
    public static boardControllerSubscribe(
        id: number,
        uuid?: string,
    ): CancelablePromise<MutationResponse> {
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
     * @param id
     * @param uuid user uuid
     * @returns MutationResponse 게시판이 정상적으로 구독 해제된 경우
     * @throws ApiError
     */
    public static boardControllerUnsubscribe(
        id: number,
        uuid?: string,
    ): CancelablePromise<MutationResponse> {
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
     * @param id
     * @param uuid user uuid
     * @returns MutationResponse 게시판이 정상적으로 알림 설정된 경우
     * @throws ApiError
     */
    public static boardControllerNotice(
        id: number,
        uuid?: string,
    ): CancelablePromise<MutationResponse> {
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
     * @param id
     * @param uuid user uuid
     * @returns MutationResponse 게시판이 정상적으로 알림 해제된 경우
     * @throws ApiError
     */
    public static boardControllerUnnotice(
        id: number,
        uuid?: string,
    ): CancelablePromise<MutationResponse> {
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
