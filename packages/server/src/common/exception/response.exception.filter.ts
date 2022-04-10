import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class ResponseExceptionFilter implements ExceptionFilter {
    
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        let error = exception.getResponse() as {
            message: string;
        };

        response.status(status).json({
            status, error
        });
    }
}