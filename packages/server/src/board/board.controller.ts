import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common"; 
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