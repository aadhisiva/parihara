import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "PariharaImgAndVideo" })
export class PariharaImgAndVideo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    SubmissionId: number;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    UserId: number;

    @Column({ default: null, type: 'nvarchar', length: 50 })
    RecordId: number;

    @Column({ default: null, type: 'varbinary', length: 200 })
    url: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    RecordType: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
