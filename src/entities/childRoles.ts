import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
  } from "typeorm";
import { UserData } from "./userData";
import { LoginAccess } from "./loginAccess";
import { LoginRoles } from "./loginRoles";
  
  
  @Entity(  { name: "ChildRole"} )
  export class ChildRole {
  
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => LoginRoles, role => role.CRToLoginRoles)
    @JoinColumn({ name: "RoleId" })
    RoleId: number;

    @Column({type: 'int', default: null})
    ChildId: number

    @CreateDateColumn()
    createdDate: Date;

  };
  