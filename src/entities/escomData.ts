import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
  } from "typeorm";
  
  
  @Entity(  { name: "EscomData"} )
  export class EscomData {
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'nvarchar', default: null, length: 100})
    RAPDRPNONRAPDRP: string;

    @Column({type: 'nvarchar', default: null, length: 'max'})
    Consumer_Name: string;

    @Column({type: 'nvarchar', default: null, length: 100})
    Account_ID: string;

    @Column({type: 'nvarchar', default: null, length: 100})
    Customer_Class: string;

    @Column({type: 'nvarchar', default: null, length: "max"})
    Consumer_Address: string;

    @Column({type: 'nvarchar', default: null, length: 200})
    Average_Units: string;

    @Column({type: 'nvarchar', default: null, length: 200})
    Entitlement_Units: string;

    @Column({type: 'nvarchar', default: null, length: 200})
    ESCOM_Name: string;

    @Column({type: 'nvarchar', default: null, length: 200})
    Sub_division: string;

    @Column({type: 'nvarchar', default: null, length: 200})
    Sub_division_Code: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  