/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateBoardAuthorityDto = {
    /**
     * 게시판
     */
    boardId: number;
    /**
     * 관리 권한
     */
    authority: CreateBoardAuthorityDto.authority;
};

export namespace CreateBoardAuthorityDto {

    /**
     * 관리 권한
     */
    export enum authority {
        READ = 'Read',
        WRITE = 'Write',
    }


}

