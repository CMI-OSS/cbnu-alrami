/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Weather = {
    /**
     * 아이디
     */
    id: number;
    /**
     * 생성 시간
     */
    createdDateTime: string;
    /**
     * 현재 날씨
     */
    currentWeather?: Weather.currentWeather;
    /**
     * 현재 온도
     */
    currentTemp?: number;
    /**
     * 오늘 최고 온도
     */
    maxTemp: number;
    /**
     * 오늘 최저 온도
     */
    minTemp: number;
    /**
     * 오전 날씨
     */
    amWeather: Weather.amWeather;
    /**
     * 오후 날씨
     */
    pmWeather: Weather.pmWeather;
    /**
     * 날짜
     */
    date: string;
    /**
     * 시간 단위
     */
    hour: number;
};

export namespace Weather {

    /**
     * 현재 날씨
     */
    export enum currentWeather {
        CLEAR = 'Clear',
        CLOUDS = 'Clouds',
        MIST = 'Mist',
        SNOW = 'Snow',
        RAIN = 'Rain',
        DRIZZLE = 'Drizzle',
        FOG = 'Fog',
        HAZE = 'Haze',
        DUST = 'Dust',
        THUNDERSTORM = 'Thunderstorm',
    }

    /**
     * 오전 날씨
     */
    export enum amWeather {
        CLEAR = 'Clear',
        CLOUDS = 'Clouds',
        MIST = 'Mist',
        SNOW = 'Snow',
        RAIN = 'Rain',
        DRIZZLE = 'Drizzle',
        FOG = 'Fog',
        HAZE = 'Haze',
        DUST = 'Dust',
        THUNDERSTORM = 'Thunderstorm',
    }

    /**
     * 오후 날씨
     */
    export enum pmWeather {
        CLEAR = 'Clear',
        CLOUDS = 'Clouds',
        MIST = 'Mist',
        SNOW = 'Snow',
        RAIN = 'Rain',
        DRIZZLE = 'Drizzle',
        FOG = 'Fog',
        HAZE = 'Haze',
        DUST = 'Dust',
        THUNDERSTORM = 'Thunderstorm',
    }


}

