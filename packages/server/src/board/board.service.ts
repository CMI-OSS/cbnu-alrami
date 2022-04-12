import { Injectable, UseFilters } from "@nestjs/common";
import { Errors } from 'src/common/exception/exception';
import ResponseExceptionFilter from "src/common/exception/response.exception.filter";
const { NOT_FOUND } = Errors;

@Injectable()
export class BoardService {

    @UseFilters(new ResponseExceptionFilter())
    async test(id: number): Promise<boolean> {
        if(id > 3) throw NOT_FOUND;
        return true;
    }

}