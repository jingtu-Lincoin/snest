import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";

@Entity("t_user")
export class User extends  BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: number;


}
