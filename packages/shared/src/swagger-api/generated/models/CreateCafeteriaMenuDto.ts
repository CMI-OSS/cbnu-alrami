/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateCafeteriaMenuDto = {
    /**
     * 학생 식당 혹은 기숙사 이름
     */
    name: CreateCafeteriaMenuDto.name;
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
    time: CreateCafeteriaMenuDto.time;
};

export namespace CreateCafeteriaMenuDto {

    /**
     * 학생 식당 혹은 기숙사 이름
     */
    export enum name {
        BONGWAN = 'BONGWAN',
        YANGJINJAE = 'YANGJINJAE',
        YANGSUNGJAE = 'YANGSUNGJAE',
        HANBIT = 'HANBIT',
        BYEOLBIT = 'BYEOLBIT',
        UNHASU = 'UNHASU',
    }

    /**
     * 식사 시간 (BREAKFAT, LUNCH, DINNER)
     */
    export enum time {
        BREAKFAST = 'BREAKFAST',
        LUNCH = 'LUNCH',
        DINNER = 'DINNER',
    }


}

