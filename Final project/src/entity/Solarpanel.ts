import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Alarm } from "./Alarm";
import { Maintenancerecord } from "./Maintenancerecord";
import { Powergenerationdata } from "./Powergenerationdata";
import { User } from "./User";

@Index("UserID", ["userId"], {})
@Entity("solarpanel", { schema: "solar_panel_monitoring" })
export class Solarpanel {
  @PrimaryGeneratedColumn({ type: "int", name: "PanelID" })
  panelId: number;

  @Column("varchar", { name: "Model", nullable: true, length: 255 })
  model: string;

  @Column("varchar", { name: "Location", nullable: true, length: 255 })
  location: string;

  @Column("datetime", { name: "InstallationDate", nullable: true })
  installationDate: Date;

  @Column("varchar", { name: "Status", nullable: true, length: 50 })
  status: string;

  @Column("float", { name: "Area", nullable: true, precision: 12 })
  area: number;

  @Column("float", { name: "RatedPower", nullable: true, precision: 12 })
  ratedPower: number;

  @Column("int", { name: "UserID", nullable: true })
  userId: number;

  @OneToMany(() => Alarm, (alarm) => alarm.panel)
  alarms: Alarm[];

  @OneToMany(() => Maintenancerecord, (maintenancerecord) => maintenancerecord.panel)
  maintenancerecords: Maintenancerecord[];

  @OneToMany(() => Powergenerationdata, (powerGenerationData) => powerGenerationData.solarpanel)
  powerGenerationData: Powergenerationdata[];

  @ManyToOne(() => User, (user) => user.solarpanels)
  @JoinColumn([{ name: "UserID", referencedColumnName: "userId" }])
  user: User;
}
