import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { LoginRoles } from "./loginRoles";


@Entity({ name: "RoleToLoss" })
export class RoleToLoss {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => LoginRoles, role => role.RoleToLossFK)
    @JoinColumn({ name: "RoleId" })
    RoleId: number;

    @Column({ default: null, type: 'nvarchar', length: 150 })
    LossType: number;

    @Column({type: 'nvarchar', length: 100, default: null})
    PendingEkyc: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    Pending: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    SeekClarification: string;
 
    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};

