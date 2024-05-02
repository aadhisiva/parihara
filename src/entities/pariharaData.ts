import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
} from "typeorm";

@Entity({ name: "PariharaData" })
export class PariharaData extends BaseEntity {

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
  txnDateTime: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  DamageCauseType: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  ImageFileName: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  EkycStatus: string;

  @Column({ type: 'nvarchar', default: null, length: 2000 })
  Remarks: string;

  @Column({ type: 'nvarchar', default: null, length: 50 })
  UserId: string;

  @Column({ type: 'nvarchar', default: null, length: 2000 })
  Video: string;

  @Column({ type: 'text', default: null })
  Image1: string;

  @Column({ type: 'text', default: null })
  Image2: string;

  @Column({ type: 'text', default: null })
  Image3: string;

  @Column({ type: 'text', default: null })
  Image4: string;

  @Column({ type: 'text', default: null })
  Image5: string;

  @Column({ type: 'text', default: null })
  Image6: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  SurveyStatus: string;

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  UpdatedDate: Date;
};