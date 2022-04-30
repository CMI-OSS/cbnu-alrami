import { Injectable } from "@nestjs/common";

import { BoardTreeRepository } from "./boardTree.repository";

@Injectable()
export class BoardTreeService {
  constructor(private readonly boardTreeRepository: BoardTreeRepository) {}
}
