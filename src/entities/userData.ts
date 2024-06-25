import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    ManyToOne,
    JoinColumn
  } from "typeorm";
import { LoginRoles } from "./loginRoles";
  
  @Entity({name: "UserData"})
  export class UserData {
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', default: null, length: '50' })
    UserId: string;

    @ManyToOne(() =>LoginRoles, lr => lr.id)
    @JoinColumn({name: "RoleId"})
    RoleId: number;

    @Column({ default: null, type: 'nvarchar', length: '50'})
    Name: string;

    @Column({ default: null, type: 'nvarchar', length: '20'})
    Mobile: string;

    @Column({ default: null, type: 'nvarchar', length: '10'})
    Otp: string;

    @Column({ default: null, type: 'nvarchar', length: '10'})
    Version: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  };
  