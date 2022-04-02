import { Injectable } from "@nestjs/common";
import { Admin } from "src/@entities/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminRepository extends Repository<Admin>{

}