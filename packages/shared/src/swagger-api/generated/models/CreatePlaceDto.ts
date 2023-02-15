/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Image } from './Image';

export type CreatePlaceDto = {
    /**
     * 장소명
     */
    name: string;
    /**
     * 위도
     */
    latitude: number;
    /**
     * 경도
     */
    longtitude: number;
    /**
     * 주소
     */
    address: string;
    /**
     * 게시물 이미지
     */
    images?: Array<Image>;
    /**
     * 이미지
     */
    imageIds?: Array<number>;
};

