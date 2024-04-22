import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity( { name: "WebLogs"} )
  export class webLogs {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null, type: 'text'})
    UserId: string;
  
    @Column({ default: null, type: 'text'})
    Role: string;

    @Column({ default: null, type: 'text'})
    Message: string;

    @Column({ default: null, type: 'text'})
    Request: string;

    @Column({ default: null, type: 'text'})
    Response: string;

    @Column({ default: null, type: 'text'})
    ResponseType: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  