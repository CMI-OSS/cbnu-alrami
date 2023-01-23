/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BoardAuthority = {
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
    authority: 'Read' | 'Write';
};

