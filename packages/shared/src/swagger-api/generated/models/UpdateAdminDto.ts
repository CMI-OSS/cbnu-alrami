/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateBoardAuthorityDto } from './CreateBoardAuthorityDto';

export type UpdateAdminDto = {
    /**
     * 비밀번호
     */
    password?: string;
    /**
     * 닉네임
     */
    nickname?: string;
    /**
     * 권한
     */
    authoirty?: UpdateAdminDto.authoirty;
    boards?: Array<CreateBoardAuthorityDto>;
};

export namespace UpdateAdminDto {

    /**
     * 권한
     */
    export enum authoirty {
        SUPER = 'Super',
        STUDENT_COUNCIL = 'StudentCouncil',
        GUEST = 'Guest',
    }


}

