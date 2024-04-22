import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "PariharaRoles" })
export class PariharaRoles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    RoleId: number;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    Role: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    Edit: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    Add: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    Delete: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
