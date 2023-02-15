/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ResponseBoardDto } from './ResponseBoardDto';

export type ResponseBoardAuthoriyDto = {
    /**
     * 아이디
     */
    id: number;
    /**
     * 생성 시간
     */
    createdDateTime: string;
    /**
     * 관리 권한
     */
    authority: ResponseBoardAuthoriyDto.authority;
    /**
     * 관리 권한이 있는 게시판
     */
    board: ResponseBoardDto;
};

export namespace ResponseBoardAuthoriyDto {

    /**
     * 관리 권한
     */
    export enum authority {
        READ = 'Read',
        WRITE = 'Write',
    }


}

