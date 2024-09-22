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

    @Column({ type: 'nvarchar', length: 40, nullable: false })
    SubmissionId: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    RoleId: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    LossType: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantName: string;

    @Column({ type: 'nvarchar', default: null, length: 12 })
    Mobile: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    EkycStatus: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantPropId: string;

    @Column({ type: 'nvarchar', default: null, length: 500 })
    ApplicantStreet: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    ApplicantAadhar: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantGuardianName: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    ApplicantHouseType: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    DamageType: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    EstimatedDamageAmt: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    DateOfDamage: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    txnDateTime: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    DamageCauseType: string;

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

    @Column({ type: 'nvarchar', default: null, length: 50 })
    UserId: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    LossDistrict: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    LossTaluk: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    LossHobli: string;

    @Column({ type: 'nvarchar', default: null, length: 50 })
    UrbanOrRural: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    LossVillage: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    SurveyStatus: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    CompensationCategory: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    HouseCompensationToRecive: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    Fallenhouse: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    Govtland: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    Govtdetail: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    PropertyType: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    RRNumber: string;

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
    KhataNo: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    RCNumber: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    VA_mobile: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    MalkiPropertyNo: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    Disability: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    ElectricityBoard: string;

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
    RRConsumer_Name: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    RRSub_division: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    RDNumber: string;

    @Column({ type: 'nvarchar', default: null, length: 'max' })
    RRConsumer_Address: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    HouseLossPercentage: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    RDdetials: string;

    @Column({ type: 'nvarchar', default: null, length: 'max' })
    RDAddress: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    RDApplicantName: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    RDApplicantFatherName: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    RDCategory: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    RDCaste: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    RDDateOfIssue: string;

    @Column({ type: 'nvarchar', default: null, length: 200 })
    Verify: string;

    @Column({ type: 'nvarchar', default: null, length: 50 })
    VillageCode: string;

    @Column({ type: 'nvarchar', default: null, length: 'max' })
    Remarks: string;

    @Column({ type: 'nvarchar', default: null, length: 50 })
    History: string;

    @Column({ type: 'nvarchar', default: null, length: 'max' })
    RRRemarks: string;

    @Column({ type: 'nvarchar', default: null, length: 50 })
    CreatedMobile: string;

    @Column({ type: 'nvarchar', default: null, length: 50 })
    CreatedRole: string;

    @Column({ type: 'nvarchar', default: null, length: 100 })
    PushedToRole: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    VerifiedBy: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    VerifiedMobile: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    CompensationSuggested: string;

    @CreateDateColumn()
    CreatedDate: Date;

    @UpdateDateColumn()
    UpdatedDate: Date;
};
