import { Injectable } from "@nestjs/common";

import { HitRepository } from "./hit.repository";

@Injectable()
export class HitService {
    constructor(private readonly hitRepository: HitRepository) {}
}