/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Board } from './Board';

export type ChildBoard = {
    /**
     * 생성 시간
     */
    createdDateTime: string;
    /**
     * 수정 시간
     */
    updatedDateTime: string;
    /**
     * 아이디
     */
    id: number;
    /**
     * 게시판 제목
     */
    name: string;
    /**
     * 게시판 URL
     */
    url?: string;
    /**
     * 부모 게시판
     */
    parent?: Board;
    /**
     * 자식 게시판
     */
    children?: Array<ChildBoard>;
};

