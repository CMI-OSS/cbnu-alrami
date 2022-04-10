import { Exclude, Expose } from "class-transformer";

export class CommonResponseDto<T> {

    @Exclude()
    private readonly _data: T;

    public constructor(data: T) {
        this._data = data;
    }

    @Expose()
    get data(): T {
        return this._data;
    }

}