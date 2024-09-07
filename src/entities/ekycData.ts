import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: "EkycData" })
  export class EkycData {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    txnNo: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    txnDateTime: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    aadhaarHash: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    finalStatus: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    vaultRefNumber: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekycTxnNo: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekycTimestamp: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    residentConsent: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    status: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    responseStatus: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    errorMessage: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    error: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    uidToken: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    actionCode: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    otp: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    otpTxnNo: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    otpTimeStamp: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_dob: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_gender: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_name: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_co: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_country: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_dist: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_house: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_street: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_lm: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_loc: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_pc: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_po: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_state: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_subdist: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_vtc: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    ekyc_lang: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_dob: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_gender: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_name: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_co: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_country: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_dist: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_house: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_street: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_lm: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_loc: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_pc: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_po: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_state: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_subdist: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_vtc: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    local_lang: string;
  
    @Column({ type: 'text', default: null })
    photo: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    maskedAadhaar: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    npciStatus: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    npciError: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    npciBankName: string;
  
    @Column({ default: null, type: 'nvarchar', length: 150 })
    npciLastUpdateDate: string;
  
    @CreateDateColumn()
    CreatedDate: Date;
  
    @UpdateDateColumn()
    UpdatedDate: Date;
  
  }
  