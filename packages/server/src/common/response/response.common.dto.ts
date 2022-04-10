import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Exclude, Expose } from "class-transformer";
import { BasicReponseDto } from "./response.basic.dto";

// export class CommonResponseDto<T> extends BasicReponseDto{

//     @Exclude()
//     private readonly data: T;

//     public constructor(data: T) {
//         super();
//         this.data = data;
//     }

//     @Expose()
//     get Data(): T {
//         return this.data;
//     }

// }

export class CommonResponseDto<T> extends BasicReponseDto {

    @Exclude()
    private readonly data: T;

    public constructor(data: T) {
        super();
        this.data = data;
    }

    @Expose()
    get Data(): T {
        return this.data;
    }

}