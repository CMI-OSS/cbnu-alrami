/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SchoolDto } from './SchoolDto';

export type UpdatePlaceDto = {
    /**
     * 장소명
     */
    name?: string;
    /**
     * 위도
     */
    latitude?: number;
    /**
     * 경도
     */
    longtitude?: number;
    /**
     * 주소
     */
    address?: string;
    /**
     * 설명
     */
    description?: string;
    /**
     * 연락처
     */
    contact?: string;
    /**
     * 이미지
     */
    imageIds?: Array<number>;
    /**
     * 학교 정보
     */
    school?: SchoolDto;
};

