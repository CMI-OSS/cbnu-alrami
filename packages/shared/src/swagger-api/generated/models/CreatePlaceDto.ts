/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
     * 이미지
     */
    imageIds?: Array<number>;
};

