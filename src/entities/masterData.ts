import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from "typeorm";


@Entity({ name: "MasterData" })
export class MasterData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'nvarchar', length: 200, default: null})
    DistrictName: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    DistrictCode: string;

    @Column({type: 'nvarchar', length: 200, default: null})
    TalukName: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    TalukCode: string;

    @Column({type: 'nvarchar', length: 200, default: null})
    HobliName: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    HobliCode: string;

    @Column({type: 'nvarchar', length: 200, default: null})
    VillageName: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    VillageCode: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    Type: string;

    @CreateDateColumn()
    createdDate: Date;
};
