/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreatePlaceDto } from './CreatePlaceDto';

export type CreateSchoolDto = {
    /**
     * 건물번호
     */
    buildingNumber: string;
    /**
     * (구)건물번호
     */
    oldBuildingNumber: string;
    /**
     * 구역(N,E,S)
     */
    area: CreateSchoolDto.area;
    place: CreatePlaceDto;
};

export namespace CreateSchoolDto {

    /**
     * 구역(N,E,S)
     */
    export enum area {
        N = 'N',
        S = 'S',
        E = 'E',
    }


}

