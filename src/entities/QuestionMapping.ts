import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";


@Entity({ name: "QuestionMapping" })
export class QuestionMapping {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    RoleId: string;

    @Column({ default: null, type: 'nvarchar', length: 500 })
    QuestionId: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    UpdatedDate: Date;
};
