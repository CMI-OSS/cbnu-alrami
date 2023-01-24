/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Weather } from '../models/Weather';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WeatherApiService {

    /**
     * 날씨 조회 API
     * 홈 화면에서 날씨를 조회합니다.
     * @returns Weather 날씨 테이블의 최근 객체 값
     * @throws ApiError
     */
    public static weatherControllerGetWeather(): CancelablePromise<Weather> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/weather',
        });
    }

}
