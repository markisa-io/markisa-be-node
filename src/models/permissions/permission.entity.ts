import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, Unique, JoinTable } from "typeorm";
import { Role } from "../roles/role.entity";
import { Tenant } from "../tenant/tenant.entity";

/**
 * Data object with annotations to configure database in ORM
 */
@Entity("tb_permission")
@Index("idx_unique_permission", ["resource", "action", "attributes", "role"])
export class Permission {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public resource: string;

  @Column()
  public action: string;

  @Column()
  public attributes: string;

  @ManyToOne((type) => Role, (role) => role.permissions, {
    onDelete: "CASCADE",
  })
  public role: Role;

  @ManyToOne((type) => Tenant, (tenant) => tenant.permissions)
  @JoinTable()
  public tenants: Tenant;
}
