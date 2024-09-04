import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";


@Entity({ name: "Districts" })
export class Districts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    DistrictNameEn: string;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    DistrictNameKa: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    DistrictCode: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    LGDDistrictCode: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    UpdatedDate: Date;
};
