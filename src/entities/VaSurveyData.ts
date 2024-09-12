import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn
  } from "typeorm";
import { LoginRoles } from "./loginRoles";
  
  @Entity({name: "VaSurveyData"})
  export class VaSurveyData {
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    DistrictCode: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    TalukCode: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    GpCode: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    VillageCode: string;

    @Column({ default: null, type: 'nvarchar', length: 10 })
    Type: string;

    @ManyToOne(() => LoginRoles, role => role.VaSurveyDataFK)
    @JoinColumn({ name: "RoleId" })
    RoleId: LoginRoles;

    @Column({ default: null, type: 'nvarchar', length: 12 })
    Mobile: string;

    @Column({ default: null, type: 'nvarchar', length: 12 })
    PDOMobile: string;

    @Column({ default: null, type: 'nvarchar', length: 12 })
    AEOMobile: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    PDOName: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    AEOName: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    Name: string;

    @Column({ default: null, type: 'nvarchar', length: 6 })
    Otp: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    UserId: string;

    @Column({ default: null, type: 'nvarchar', length: 13 })
    CreatedMobile: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    CreatedRole: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    UpdatedDate: Date;
  };
  