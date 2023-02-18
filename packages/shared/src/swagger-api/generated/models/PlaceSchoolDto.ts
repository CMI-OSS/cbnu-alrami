/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Image } from './Image';
import type { School } from './School';

export type PlaceSchoolDto = {
    /**
     * 아이디
     */
    id: number;
    /**
     * 생성 시간
     */
    createdDateTime: string;
    /**
     * 수정 시간
     */
    updatedDateTime: string;
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
     * 설명
     */
    description?: string;
    /**
     * 연락처
     */
    contact?: string;
    /**
     * 게시물 이미지
     */
    images?: Array<Image>;
    /**
     * 학교 정보
     */
    school: School;
};

