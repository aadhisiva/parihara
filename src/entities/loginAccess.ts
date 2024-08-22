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

    @ManyToOne(() => LoginRoles, role => role.UdToLoginRoles)
    @JoinColumn({ name: "RoleId" })
    RoleId: number;

    @Column({type: 'nvarchar', length: 100, default: null})
    PendingEkyc: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    Pending: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    SeekClarification: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    District: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    Taluk: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    Gp: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    Village: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    Type: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    LossType: string;

    @CreateDateColumn()
    createdDate: Date;
};
