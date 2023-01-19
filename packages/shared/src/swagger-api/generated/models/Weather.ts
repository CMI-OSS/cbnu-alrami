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
    currentWeather?: 'Clear' | 'Clouds' | 'Mist' | 'Snow' | 'Rain' | 'Drizzle' | 'Fog' | 'Haze' | 'Dust' | 'Thunderstorm';
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
    amWeather: 'Clear' | 'Clouds' | 'Mist' | 'Snow' | 'Rain' | 'Drizzle' | 'Fog' | 'Haze' | 'Dust' | 'Thunderstorm';
    /**
     * 오후 날씨
     */
    pmWeather: 'Clear' | 'Clouds' | 'Mist' | 'Snow' | 'Rain' | 'Drizzle' | 'Fog' | 'Haze' | 'Dust' | 'Thunderstorm';
    /**
     * 날짜
     */
    date: string;
    /**
     * 시간 단위
     */
    hour: number;
};

