import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany} from "typeorm";

import { Solarpanel } from "./Solarpanel";
import { Alarm } from "./Alarm";

@Entity("user", { schema: "solar_panel_monitoring" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "UserID" })
  userId: number;

  @Column("varchar", { name: "Username", nullable: true, length: 255 })
  username: string;

  @Column("varchar", { name: "Password", nullable: true, length: 255 })
  password: string;

  @Column("varchar", { name: "Role", nullable: true, length: 50 })
  role: string;

  @Column("varchar", { name: "Name", nullable: true, length: 255 })
  name: string;

  @Column("varchar", { name: "Contact", nullable: true, length: 255 })
  contact: string;

  @OneToMany(() => Solarpanel, (solarpanel) => solarpanel.user)
  solarpanels: Solarpanel[];

  @ManyToMany(() => Alarm, (alarm) => alarm.users)
  alarms: Alarm[];
}
