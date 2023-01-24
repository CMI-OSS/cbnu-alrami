/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type School = {
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
    area: School.area;
};

export namespace School {

    /**
     * 구역(N,E,S)
     */
    export enum area {
        N = 'N',
        S = 'S',
        E = 'E',
    }


}

