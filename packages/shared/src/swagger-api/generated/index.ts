/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export { Admin } from './models/Admin';
export type { Board } from './models/Board';
export { BoardAuthority } from './models/BoardAuthority';
export { CafeteriaMenu } from './models/CafeteriaMenu';
export type { ChildBoard } from './models/ChildBoard';
export { CreateAdminDto } from './models/CreateAdminDto';
export type { CreateArticleDto } from './models/CreateArticleDto';
export { CreateBoardAuthorityDto } from './models/CreateBoardAuthorityDto';
export type { CreateBoardDto } from './models/CreateBoardDto';
export { CreateCafeteriaMenuDto } from './models/CreateCafeteriaMenuDto';
export type { CreatePlaceDto } from './models/CreatePlaceDto';
export type { CreateScheduleDto } from './models/CreateScheduleDto';
export { CreateSchoolDto } from './models/CreateSchoolDto';
export type { CreateUserDto } from './models/CreateUserDto';
export type { DuplicatedArticleException } from './models/DuplicatedArticleException';
export type { DuplicatedLoginIdException } from './models/DuplicatedLoginIdException';
export type { Image } from './models/Image';
export type { LoginDto } from './models/LoginDto';
export type { MutationResponse } from './models/MutationResponse';
export type { NotFoundAdminException } from './models/NotFoundAdminException';
export type { NotFoundArticleException } from './models/NotFoundArticleException';
export type { NotFoundBoardException } from './models/NotFoundBoardException';
export type { NotFoundBoardsException } from './models/NotFoundBoardsException';
export type { PlaceSchoolDto } from './models/PlaceSchoolDto';
export type { ResponseArticleDetailDto } from './models/ResponseArticleDetailDto';
export type { ResponseArticleDto } from './models/ResponseArticleDto';
export type { ResponseBoardDto } from './models/ResponseBoardDto';
export type { ResponseLoginDto } from './models/ResponseLoginDto';
export type { Schedule } from './models/Schedule';
export { School } from './models/School';
export { UpdateAdminDto } from './models/UpdateAdminDto';
export type { UpdateArticleDto } from './models/UpdateArticleDto';
export type { UpdateBoardDto } from './models/UpdateBoardDto';
export { UpdateSchoolDto } from './models/UpdateSchoolDto';
export { Weather } from './models/Weather';

export { AdminApiService } from './services/AdminApiService';
export { ArticleApiService } from './services/ArticleApiService';
export { BoardApiService } from './services/BoardApiService';
export { CafeteriaMenuApiService } from './services/CafeteriaMenuApiService';
export { ImageApiService } from './services/ImageApiService';
export { PlaceApiService } from './services/PlaceApiService';
export { ScheduleApiService } from './services/ScheduleApiService';
export { SchoolApiService } from './services/SchoolApiService';
export { UserApiService } from './services/UserApiService';
export { WeatherApiService } from './services/WeatherApiService';
