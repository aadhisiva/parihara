import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity( { name: "Version"} )
  export class Version {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null, type: 'text'})
    Version: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  