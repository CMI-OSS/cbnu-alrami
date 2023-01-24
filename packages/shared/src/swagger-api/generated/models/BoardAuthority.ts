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
    authority: BoardAuthority.authority;
};

export namespace BoardAuthority {

    /**
     * 관리 권한
     */
    export enum authority {
        READ = 'Read',
        WRITE = 'Write',
    }


}

