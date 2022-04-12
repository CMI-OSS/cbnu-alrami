import { Controller, Get, Inject, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common"; 
import { TransformInterceptor } from "src/common/interceptor/response.interceptor";
import { BoardService } from "./board.service";

// @UseInterceptors(TransformInterceptor)
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