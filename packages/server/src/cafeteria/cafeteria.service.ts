import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Cafeteria } from "src/commons/entities/cafeteria.entity";
import CreateCafeterias from "src/commons/seeds/cafeteria.seed";
import { Connection } from "typeorm";

import { CafeteriaRepository } from "./repository/cafeteria.repository";

@Injectable()
export class CafeteriaService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(CafeteriaRepository)
    private cafeteriaRepository: CafeteriaRepository,
    private createCafeterias: CreateCafeterias,
  ) {
    this.cafeteriaRepository
      .find()
      .then((res) =>
        res ? null : this.createCafeterias.run(undefined, this.connection),
      );
  }
}
