/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreatePlaceDto } from './CreatePlaceDto';

export type UpdateSchoolDto = {
    /**
     * 건물번호
     */
    buildingNumber?: string;
    /**
     * (구)건물번호
     */
    oldBuildingNumber?: string;
    /**
     * 구역(N,E,S)
     */
    area?: 'N' | 'S' | 'E';
    place?: CreatePlaceDto;
};

