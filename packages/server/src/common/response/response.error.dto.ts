import { Exclude, Expose, Type } from "class-transformer";
import { Error } from "./error.dto";
import { BasicReponseDto } from "./response.basic.dto";

export class ErrorDto extends BasicReponseDto {

    @Exclude()
    @Type(() => Error)
    private readonly _error: Error;

    public constructor(error: Error) {
        super();
        this._error = error;
    }

    @Expose()
    get error(): Error {
        return this._error;
    }

}