import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany
  } from "typeorm";
import { VaSurveyData } from "./VaSurveyData";
import { LoginAccess } from "./loginAccess";
import { ChildRole } from "./childRoles";
import { RoleToLoss } from "./roleToLoss";
  
  
  @Entity(  { name: "LoginRoles"} )
  export class LoginRoles {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null, type: 'nvarchar', length: 200})
    RoleName: string;

    @OneToMany(() => VaSurveyData, ur=>ur.RoleId, { cascade: true, onDelete: "CASCADE" })
    VaSurveyDataFK: VaSurveyData[];

    @OneToMany(() => LoginAccess, ur=>ur.RoleId, { cascade: true, onDelete: "CASCADE" })
    UdToLoginRoles: LoginAccess[];

    @OneToMany(() => ChildRole, ur=>ur.RoleId, { cascade: true, onDelete: "CASCADE" })
    CRToLoginRoles: ChildRole[];

    @OneToMany(() => RoleToLoss, ur=>ur.RoleId, { cascade: true, onDelete: "CASCADE" })
    RoleToLossFK: RoleToLoss[];

    @CreateDateColumn()
    createdDate: Date;

  };
  