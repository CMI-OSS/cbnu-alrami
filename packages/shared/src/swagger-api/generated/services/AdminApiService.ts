/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Admin } from '../models/Admin';
import type { Board } from '../models/Board';
import type { CreateAdminDto } from '../models/CreateAdminDto';
import type { LoginDto } from '../models/LoginDto';
import type { MutationResponse } from '../models/MutationResponse';
import type { ResponseLoginDto } from '../models/ResponseLoginDto';
import type { UpdateAdminDto } from '../models/UpdateAdminDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminApiService {

    /**
     * 관리자 생성
     * @returns MutationResponse 관리자가 정상적으로 생성된 경우
     * @throws ApiError
     */
    public static adminControllerCreate({
        requestBody,
    }: {
        requestBody: CreateAdminDto,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 관리자 목록 조회
     * @returns Admin
     * @throws ApiError
     */
    public static adminControllerFindAll(): CancelablePromise<Array<Admin>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin',
        });
    }

    /**
     * 권한이 있는 게시판 조회
     * @returns Board
     * @throws ApiError
     */
    public static adminControllerGetAuthorityBoards(): CancelablePromise<Array<Board>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/board',
        });
    }

    /**
     * 본인 관리자 조회
     * @returns Admin
     * @throws ApiError
     */
    public static adminControllerFindMe(): CancelablePromise<Admin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/me',
        });
    }

    /**
     * 관리자 조회
     * @returns Admin
     * @throws ApiError
     */
    public static adminControllerFindOne({
        id,
    }: {
        id: number,
    }): CancelablePromise<Admin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * 관리자 수정
     * @returns MutationResponse
     * @throws ApiError
     */
    public static adminControllerUpdate({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: UpdateAdminDto,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/{id}',
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
    public static adminControllerRemove({
        id,
    }: {
        id: number,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * 로그인
     * @returns ResponseLoginDto
     * @throws ApiError
     */
    public static adminControllerLogin({
        requestBody,
    }: {
        requestBody: LoginDto,
    }): CancelablePromise<ResponseLoginDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
