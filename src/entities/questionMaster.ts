import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "QuestionMaster" })
export class QuestionMaster {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    QuestionId: number;

    @Column({ default: null, type: 'nvarchar', length: 500 })
    Question: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    QuestionType: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    DropdownValues: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    IsSubQuestion: string;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    ParentQuestion: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
