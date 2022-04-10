import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common"; 
import { BasicReponseDto } from "src/common/response/response.basic.dto";
import { CommonResponseDto } from "src/common/response/response.common.dto";
import { ErrorResponseDto } from "src/common/response/error/response.error.dto";
// import { Error } from "src/common/response/error/error.dto"; 
import { ResponseExceptionFilter } from "src/common/exception/response.exception.filter";
// import { Error } from "src/common/exception/exception";

import { BoardService } from "./board.service";

@Controller('board')
export class BoardController {

    constructor( 
        @Inject(BoardService)
        private boardService:BoardService
    ){}

    @Get('/:boardId')
    test(
        @Param('boardId', ParseIntPipe) id: number
    ): Promise<Boolean> {
        return this.boardService.test(id);
    }

}