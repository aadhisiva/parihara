import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "DropdownValues" })
export class DropdownValues {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: 100 })
    DropdownType: number;

    @Column({ default: null, type: 'nvarchar', length: 500 })
    DropdownName: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
