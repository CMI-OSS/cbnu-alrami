import { Exclude, Expose, Type } from "class-transformer";
import { Error } from "./error.dto";

export class ErrorDto {

    @Exclude()
    @Type(() => Error)
    private readonly _error: Error;

    public constructor(error: Error) {
        this._error = error;
    }

    @Expose()
    get error(): Error {
        return this._error;
    }

}