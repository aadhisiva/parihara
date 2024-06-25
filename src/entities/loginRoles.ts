import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity(  { name: "LoginRoles"} )
  export class LoginRoles {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null, type: 'nvarchar', length: 200})
    Role: string;

    @CreateDateColumn()
    createdDate: Date;

  };
  