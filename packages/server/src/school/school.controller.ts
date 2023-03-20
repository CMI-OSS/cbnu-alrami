import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { SchoolService } from "./school.service";

@ApiTags("[school] 학교 API")
@Controller("school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
}
