import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "Districts" })
export class Districts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    DistrctNameEn: number;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    DistrctNameKa: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    DistrctCode: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    LGDDistrictCode: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
