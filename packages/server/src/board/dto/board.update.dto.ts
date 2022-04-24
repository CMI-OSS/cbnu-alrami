import { PartialType } from "@nestjs/mapped-types";

import { BoardCreateDto } from "./board.create.dto";

export class BoardUpdateDto extends PartialType(BoardCreateDto) {}
