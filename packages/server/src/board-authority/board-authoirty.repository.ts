import { BoardAuthority } from "src/commons/entities/boardAuthority.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BoardAuthority)
export class BoardAuthorityRepository extends Repository<BoardAuthority> {}
