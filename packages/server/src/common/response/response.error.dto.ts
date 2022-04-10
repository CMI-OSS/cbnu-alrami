import { Exclude, Expose } from "class-transformer";
import { Error } from "./errorDto";

export class ErrorDto {

    @Exclude()
    private readonly _error: Error;

    public constructor(error: Error) {
        this._error = error;
    }

    @Expose()
    get error(): Error {
        return this._error;
    }

}