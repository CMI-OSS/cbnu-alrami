import { Exclude, Expose } from "class-transformer";
import { BasicReponseDto } from "./response.basic.dto";

export class CommonResponseDto<T> extends BasicReponseDto{

    @Exclude()
    private readonly _data: T;

    public constructor(data: T) {
        super();
        this._data = data;
    }

    @Expose()
    get data(): T {
        return this._data;
    }

}