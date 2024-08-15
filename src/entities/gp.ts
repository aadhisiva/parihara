import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "GramaPanchayat" })
export class GramaPanchayat {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    GpNameEn: string;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    GpNameKa: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    GpCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    DistrictCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    TalukCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    LGDTalukCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    LGDDistrictCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    LGDGpCode: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};


