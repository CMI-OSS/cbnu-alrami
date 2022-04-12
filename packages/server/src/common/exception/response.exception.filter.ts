import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch(HttpException)
export default class ResponseExceptionFilter implements ExceptionFilter {
    
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        let httpError = null;
        if(exception instanceof HttpException) {
            httpError = {
                error: {
                    message: exception.message
                }
            }
        }

        const { error } = httpError;
        response
            .status(status)
            .json({
                error
            });
    }
}