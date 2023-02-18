/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SchoolDto = {
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
    area: SchoolDto.area;
};

export namespace SchoolDto {

    /**
     * 구역(N,E,S)
     */
    export enum area {
        N = 'N',
        S = 'S',
        E = 'E',
    }


}

