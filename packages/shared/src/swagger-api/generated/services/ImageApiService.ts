/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Image } from '../models/Image';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ImageApiService {

    /**
     * 이미지 업로드
     * @returns Image 정상적으로 이미지가 업로드된 경우
     * @throws ApiError
     */
    public static imageControllerUpload({
        formData,
    }: {
        formData: {
            images?: Array<Blob>;
        },
    }): CancelablePromise<Array<Image>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/image/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

}
