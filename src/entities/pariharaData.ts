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

  @Column({ type: 'nvarchar', length: 40, nullable: true })
  SubmissionId: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  RoleId: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  LossType: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  NoOfDaysFromDamage: string;

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
  FruitsFarmerId: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  FruitsSurveyNo: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  FruitSurnocNo: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  FruitHissaNo: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  FruitArea: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  FruitGruntas: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  Year: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  Season: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  KGISSurveyNo: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CropType: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  BloomingType: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  NoTreesDamged: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CropName: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CropLossArea: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CropLossGruntas: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CropLossPercentage: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  ApproxLoss: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CattleType: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CattleCount: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  DeathReason: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CattleDateTimeDeath: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  RationAadharNo: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  DeceasedName: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  Gender: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  Age: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  ApplicantRelationship: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  LifeDateTimeDeath: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  FruitsIdLocation: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  FIRDetails: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  DamgeType: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  SpecifyOther: string;

  @Column({ type: 'nvarchar', default: null, length: 1000 })
  Remark: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  EkycStatus: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  VA_DamageLength: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  VA_DamageBreath: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  VA_DamageArea: string;

  @Column({ type: 'nvarchar', default: null, length: 500 })
  VA_AddressProperty: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  VA_ApplicantRight: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  VA_LossValue: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  VA_CompensationValue: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  OtherDamageRemarks: string;

  @Column({ type: 'nvarchar', default: null, length: 50 })
  UserId: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  LossDistrict: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  LossTaluk: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  LossHobli: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  LossVillage: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  SurveyStatus: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  CropWaterSource: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  CompensationCategory: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  HouseCompensationRecived: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Fallenhouse: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Govtland: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Govtdetail: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  PropertyType: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  FamilyCount: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  FamilyHolding: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  BankName: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  BankAccountNumber: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  IFSCCode: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  RCNumber: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  VA_mobile: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  MalkiPropertyNo: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Disability: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  ApplicantAge: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Caste: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  AE_mobile: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  PDO_mobile: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  DamageExtent: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  HouseLossPercentage: string;

  @Column({ type: 'nvarchar', default: null, length: 200 })
  Verify: string;

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  UpdatedDate: Date;
};
