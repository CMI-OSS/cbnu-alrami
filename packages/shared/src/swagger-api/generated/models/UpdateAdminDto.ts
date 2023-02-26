/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateAdminDto = {
    /**
     * 닉네임
     */
    nickname?: string;
    /**
     * 권한
     */
    authoirty?: UpdateAdminDto.authoirty;
    /**
     * 비밀번호
     */
    password?: string;
    /**
     * 게시판 아이디 목록
     */
    boardIds?: Array<number>;
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

