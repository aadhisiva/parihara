import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "Taluks" })
export class Taluks {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    TalukNameEn: number;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    TalukNameKa: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    TalukCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    LGDTalukCode: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    LGDDistrictCode: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
