import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/commons/decorators/public.decorator";

import { BoardTreeService } from "./boardTree.service";

@Public()
@Controller("boards/tree")
@ApiTags("[boardTree] 공지사항 사이트 계층구조 도메인 API")
export class BoardTreeController {
  constructor(private readonly boardTreeService: BoardTreeService) {}
}
