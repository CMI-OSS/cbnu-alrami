/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Board } from './Board';

export type Admin = {
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
     * 로그인에 사용할 아이디
     */
    loginId: string;
    /**
     * 닉네임
     */
    nickname: string;
    /**
     * 권한
     */
    authoirty: Admin.authoirty;
    /**
     * 권한이 부여된 게시판
     */
    boards: Array<Board>;
};

export namespace Admin {

    /**
     * 권한
     */
    export enum authoirty {
        SUPER = 'Super',
        STUDENT_COUNCIL = 'StudentCouncil',
        GUEST = 'Guest',
    }


}

