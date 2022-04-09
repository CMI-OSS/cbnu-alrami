import { Exclude, Expose } from "class-transformer";

// 실패 : { "error":{ "message": "실패 원인" } }
// 성공 : { // API 요구 데이터 }
export class responseDto<T> {

    @Exclude() 
    private readonly _error: response;

    @Exclude() 
    private readonly _data: T;

    public constructor(error: response, data: T) {
        this._error = error;
        this._data = data;
    }

    @Expose()
    get error(): response {
        return this._error;
    }

    @Expose()
    get data(): T {
        return this._data;
    }
}

interface response {
    message: string;
}