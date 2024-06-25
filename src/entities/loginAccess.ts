import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { LoginRoles } from "./loginRoles";


@Entity({ name: "LoginAccess" })
export class LoginAccess {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => LoginRoles, role => role.id)
    @JoinColumn({ name: "RoleId" })
    RoleId: number;

    @Column({type: 'nvarchar', length: 100, default: null})
    PendingEkyc: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    Pending: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    SeekClarification: string;

    @CreateDateColumn()
    createdDate: Date;
};
