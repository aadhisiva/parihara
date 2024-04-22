import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  @Entity( { name: "OtpLogs"} )
  export class OtpLogs {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null, type: 'text'})
    otp: string;
  
    @Column({ default: null, type: 'text'})
    Mobile: string;
  
    @Column({ default: null, type: 'text'})
    Message: string;
  
    @Column({ default: null, type: 'text'})
    Response: string;
  
    @Column({ default: null, type: 'text'})
    UserId: string;
  
    @CreateDateColumn()
    createdDate: Date;
  }
  