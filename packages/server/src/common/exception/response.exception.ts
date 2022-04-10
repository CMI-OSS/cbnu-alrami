import { HttpException } from "@nestjs/common";

export class ResponseException extends HttpException {
    constructor(error?: number) {
        super('test', error);
    }
}