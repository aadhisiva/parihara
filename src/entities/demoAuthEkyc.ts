import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  @Entity({ name: "DemoAuthEkyc" })
  export class DemoAuthEkyc {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    TxnNo: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    TxnDateTime: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    BeneficiaryID: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    AadhaarDemoAuthStatus: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    AadhaarDemoAuthError: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    NameMatchStatus: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    NameMatchScore: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    FinalStatus: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    VaultRefNumber: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    NPCIStatus: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    MaskedAadhaar: string;
  
    @Column({ type: 'nvarchar', length: 100, default: null })
    NPCIError: string;
  
    @Column({ type: 'nvarchar', length: 200, default: null })
    AadhaarHash: string;
  
    @Column({ type: 'nvarchar', length: 200, default: null })
    UIDToken: string;
  
    @Column({ type: 'nvarchar', length: 200, default: null })
    BeneficiaryAadaarName: string;

    @CreateDateColumn()
    created_at: Date;
  };