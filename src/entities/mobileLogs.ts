import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity(  { name: "MobileLogs"} )
  export class MobileLogs {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null, type: 'text'})
    UserId: string;
  
   @Column({ default: null, type: 'text'})
    Role: string;

   @Column({ default: null, type: 'text'})
    logMessage: string;

   @Column({ default: null, type: 'text'})
    apiMessage: string;

   @Column({ default: null, type: 'text'})
    Request: string;

   @Column({ default: null, type: 'text'})
    Response: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  