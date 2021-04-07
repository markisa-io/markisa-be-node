import { Column, Entity, Index, PrimaryColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Permission } from "../permissions/permission.entity";
import { Tenant } from "../tenant/tenant.entity";
import { User } from "../users/user.entity";

/**
 * Data object with annotations to configure database in ORM
 */
@Entity("tb_roles")
export class Role {

  @PrimaryColumn()
  public id: string;

  @Column()
  public description: string;

  @Column({default: false})
  public archived?: boolean;

  @OneToMany((type) => Permission, (permission) => permission.role, {
    cascade: true,
    onDelete: "CASCADE",
  })
  public permissions: Permission[];

  @ManyToMany((type) => User, (user) => user.roles)
  @JoinTable()
  public users: User[];

  @ManyToOne((type) => Tenant, (tenant) => tenant.roles)
  @JoinTable()
  public tenants: Tenant;
}
