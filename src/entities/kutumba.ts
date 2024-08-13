import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: "Kutumba" })
  export class Kutumba {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', length: 200, default: null })
    MBR_FARMER_ID: string;
  
    @Column({ type: 'nvarchar', default: null, length: 200 })
    MBR_LAND_Extent: string;
  
    @Column({ type: 'nvarchar', default: null, length: 200 })
    MBR_CASTE_RD_NO: string;
  
    @Column({ type: 'nvarchar', default: null, length: 200 })
    MBR_CASTE_CATEGORY: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    RC_NUMBER: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    FAMILY_ID: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    MEMBER_NAME_ENG: string;
  
    @Column({ type: 'nvarchar', default: null, length: 200 })
    Vault_Reference_No: string;
  
    @Column({ type: 'nvarchar', default: null, length: 300 })
    MBR_HASH_AADHAR: string;
  
    @Column({ type: 'nvarchar', default: null, length:  50 })
    MBR_GENDER: string;
  
    @Column({ type: 'nvarchar', default: null, length: 50 })
    MBR_DOB: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    RELATION_NAME: string;
  
    @Column({ type: 'nvarchar', default: null, length: 'max' })
    MBR_ADDRESS: string;
  
    @Column({ type: 'nvarchar', default: null, length: 50 })
    LGD_DISTRICT_CODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    LGD_DISTRICT_Name: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    LGD_TALUK_CODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    LGD_TALUK_Name: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    LGD_VILLAGE_CODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    LGD_VILLAGE_Name: string;
  
    @Column({ type: 'nvarchar', default: null, length: 150 })
    ESCOM_ConnectionID: string;
  
    @Column({ type: 'nvarchar', default: null, length: 50 })
    RR_Number: string;
  
    @Column({ type: 'nvarchar', default: null, length: 200 })
    Kutumba_ID_status: string;
  
    @Column({ type: 'nvarchar', default: null, length: 200 })
    HasedResultValue: string;
  
    @Column({ type: 'nvarchar', default: null, length: 100 })
    UserId: string;
  
    @Column({ type: 'nvarchar', default: null, length: '500' })
    status: string;
  
    @CreateDateColumn()
    CreatedDate: Date;
  
    @UpdateDateColumn()
    UpdatedDate: Date;
  
  };
