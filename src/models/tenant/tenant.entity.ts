import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, Index, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Permission } from "../permissions/permission.entity";
import { Role } from "../roles/role.entity";
import { User } from "../users/user.entity";
/**
 * Data object with annotations to configure database in ORM
 */
@Entity("tb_tenants")
export class Tenant {
    @PrimaryColumn()
    public id: string;

    @Column()
    public subsType: string;

    @OneToMany(type => User, user => user.tenants)
    public users: User[];

    @OneToMany(type => Role, role => role.tenants)
    public roles: Role[];

    @OneToMany(type => Permission, permission => permission.tenants)
    public permissions: Permission[];
}