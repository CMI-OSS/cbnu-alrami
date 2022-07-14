import { Controller } from "@nestjs/common";
import { Public } from "src/commons/decorators/public.decorator";

import { SubscribeService } from "./subscribe.service";

@Public()
@Controller()
export class SubscribeControlelr {
  constructor(private readonly subscribeService: SubscribeService) {}
}
