import { Authority } from "src/@constants/enum";
import { Column, Entity } from "typeorm";
import { CommonEntity } from "./common.entity";



@Entity()
export class Admin extends CommonEntity{


  @Column({type:"varchar", length: 20, unique:true})
  username: string;

  @Column({type:"varchar", length: 20})
  password: string;
  
  @Column({type: "varchar", length: 20, unique:true})
  nickname: string;

  @Column({type: "enum", enum:Authority, default: Authority.Guest})
  authority: Authority;
}