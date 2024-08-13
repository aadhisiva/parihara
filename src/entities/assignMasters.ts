import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "AssignMasters" })
export class AssignMasters {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    ListType: number;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    DistrictCode: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    TalukCode: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    HobliCode: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    VillageCode: string;

    @Column({ type: 'int' })
    RoleId: string;

    @Column({ default: null, type: 'nvarchar', length: 12 })
    Mobile: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    Name: string;

    @Column({ default: null, type: 'nvarchar', length: 6 })
    Otp: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
