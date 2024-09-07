import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";


@Entity({ name: "RDMinority" })
export class RDMinority {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  GSCNo: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  TLIFileNo: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  DistrictName: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  TalukName: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  HobliName: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  VillageName: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  HabitationName: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  VillageWardLabel: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  App_Title: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ApplicantName: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ApplicantBincom: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Fat_Title: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ApplicantFatherName: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ApplicantMotherName: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ApplicantCAddress1: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ApplicantCAddress2: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ApplicantCAddress3: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ApplicantCAddressPin: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ReservationCategory: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Caste: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  AnnualIncome: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  AnnualIncomeInWords: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Photo: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Purpose: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  DateOfIssue: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Version: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Barcode: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ValidPeriod: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  SpecialTaluk: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  SignerName: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  CertificateValidUpto: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  PurposeRequested: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  RIReportDate: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  RIReportNo: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  MemberIncomeWords: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  WorkingOrNot: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  AnnualIncomeExceptPensionInWords: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  IncomeExceptPension: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  MilitaryNonMilitaryPersonnel: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  StayingMonths: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  StayingYears: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Language: string;

  @CreateDateColumn()
  createdDate: Date;
};

