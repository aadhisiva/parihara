import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany
  } from "typeorm";
import { UserData } from "./userData";
  
  
  @Entity(  { name: "LoginRoles"} )
  export class LoginRoles {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null, type: 'nvarchar', length: 200})
    RoleName: string;

    @OneToMany(() => UserData, ur=>ur.RoleId, { cascade: true, onDelete: "CASCADE" })
    UserDataFK: UserData[];

    @CreateDateColumn()
    createdDate: Date;

  };
  