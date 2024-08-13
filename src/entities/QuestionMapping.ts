import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "QuestionMapping" })
export class QuestionMapping {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    RoleId: number;

    @Column({ default: null, type: 'nvarchar', length: 500 })
    QuestionId: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
