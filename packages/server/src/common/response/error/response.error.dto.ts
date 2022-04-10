import { Exclude, Expose, Type } from "class-transformer";
import { Error } from "./error.dto";
import { BasicReponseDto } from "../response.basic.dto";

export class ErrorResponseDto extends BasicReponseDto {

    @Exclude()
    @Type(() => Error)
    private readonly error: Error;

    public constructor(error: Error) {
        super();
        this.error = error;
    }

    @Expose()
    get Error(): Error {
        return this.error;
    }

}