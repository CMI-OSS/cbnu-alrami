/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserApiService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static userControllerCreate({
        requestBody,
    }: {
        requestBody: CreateUserDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
