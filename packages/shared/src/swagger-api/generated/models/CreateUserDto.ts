/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateUserDto = {
    /**
     * 사용자 uuid
     */
    uuid: string;
    /**
     * FCN TOKEN
     */
    fcmToken: string;
    /**
     * devios 정보
     */
    device: string | null;
};

