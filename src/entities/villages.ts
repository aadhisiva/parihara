import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";

@Entity({ name: "Villages" })
export class Villages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    VillageNameEn: string;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    VillageNameKa: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    VillageCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    GpCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    DistrictCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    TalukCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    LGDVillageCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    LGDDistrictCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    LGDGpCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    LGDTalukCode: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};

