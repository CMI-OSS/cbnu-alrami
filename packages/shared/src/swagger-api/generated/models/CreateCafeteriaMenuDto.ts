/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateCafeteriaMenuDto = {
    /**
     * 학생 식당 혹은 기숙사 이름
     */
    name: '본관' | '양진재' | '양성재' | '한빛식당' | '별빛식당' | '은하수식당';
    /**
     * 메뉴
     */
    menu: string;
    /**
     * YYYY-MM-DD
     */
    date: string;
    /**
     * 식사 시간 (BREAKFAT, LUNCH, DINNER)
     */
    time: 'BREAKFAST' | 'LUNCH' | 'DINNER';
};

