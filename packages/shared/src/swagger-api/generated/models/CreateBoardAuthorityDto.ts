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
    authority: 'Read' | 'Write';
};

