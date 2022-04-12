import { HttpException, HttpStatus } from "@nestjs/common";
import { Error } from "./exception";

export class ResponseException extends HttpException {

    public error: Error;

    constructor(responseException: Error) {
        // 일단 박아놓고 이따 수정하자 
        super(responseException, HttpStatus.FORBIDDEN);
    }

}