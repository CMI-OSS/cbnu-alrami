/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Admin } from '../models/Admin';
import type { CreateAdminDto } from '../models/CreateAdminDto';
import type { MutationResponse } from '../models/MutationResponse';
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

}
