/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CafeteriaMenu } from '../models/CafeteriaMenu';
import type { CreateCafeteriaMenuDto } from '../models/CreateCafeteriaMenuDto';
import type { MutationResponse } from '../models/MutationResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CafeteriaMenuApiService {

    /**
     * 메뉴 등록
     * @returns MutationResponse 등록 성공 여부
     * @throws ApiError
     */
    public static cafeteriaMenuControllerCreate({
        requestBody,
    }: {
        requestBody: CreateCafeteriaMenuDto,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cafeteria-menu',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 학생식당 일자별 메뉴 조회
     * @returns CafeteriaMenu
     * @throws ApiError
     */
    public static cafeteriaMenuControllerFindAll({
        name,
        date,
    }: {
        name: string,
        date: string,
    }): CancelablePromise<Array<CafeteriaMenu>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cafeteria-menu/{name}/{date}',
            path: {
                'name': name,
                'date': date,
            },
        });
    }

}
