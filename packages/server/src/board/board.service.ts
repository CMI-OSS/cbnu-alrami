import { Injectable } from "@nestjs/common";
import { errors } from 'src/common/exception/exception';
const { NOT_FOUND } = errors;

@Injectable()
export class BoardService {

    async test(id: number): Promise<boolean> {
        if(id > 3) throw NOT_FOUND;
        return true;
    }

}