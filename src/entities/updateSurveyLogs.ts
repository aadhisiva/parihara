import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";


@Entity({ name: "UpdatedSurveyLogs" })
export class UpdatedSurveyLogs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 20, nullable: false })
    SubmissionId: string;
  
    @Column({ type: 'nvarchar', nullable: false, length: 100 })
    RoleId: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ReqType: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantName: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantPropId: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantStreet: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantAadhar: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantDistrict: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantTaluk: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantVillage: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantHobli: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    Latitude: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    Longitude: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantGuardianName: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    Mobile: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    KhataNo: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantDoorNo: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantHouseType: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    DamageType: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    EstimatedDamageAmt: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    IsPropertyTaxId: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    DateOfDamage: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    DamageCauseType: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    ImageFileName: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    Remarks: string;
  
    @Column({ type: 'text' })
    Image: string;

    @Column({ type: 'nvarchar', default: null, length: 2000 })
    LossDistrict: string;
  
    @Column({ type: 'nvarchar', default: null, length: 2000 })
    LossTaluk: string;
  
    @Column({ type: 'nvarchar', default: null, length: 2000 })
    LossHobli: string;
  
    @Column({ type: 'nvarchar', default: null, length: 2000 })
    LossVillage: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    SurveyStatus: string;
  
    @CreateDateColumn()
    UpdatedDate: Date;
};
