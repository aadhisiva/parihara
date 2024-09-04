import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";


@Entity({ name: "PariharaImgAndVideo" })
export class PariharaImgAndVideo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    SubmissionId: string;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    UserId: number;

    @Column({ default: null, type: 'varbinary', length: 200 })
    Url: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    RecordType: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    Latitude: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    Longitude: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    UpdatedDate: Date;
};
