import { Admin } from "src/@entities/admin.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{

}