import { BoardTree } from "src/commons/entities/boardTree.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BoardTree)
export class BoardTreeRepository extends Repository<BoardTree> {}
