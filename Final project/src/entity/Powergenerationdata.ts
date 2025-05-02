import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Solarpanel } from "./Solarpanel";

@Index("PanelID", ["panelId"], {})
@Entity("powergenerationdata", { schema: "solar_panel_monitoring" })
export class Powergenerationdata {
  @PrimaryGeneratedColumn({ type: "int", name: "DataID" })
  dataId: number;

  @Column("int", { name: "PanelID", nullable: true })
  panelId: number;

  @Column("datetime", { name: "Timestamp", nullable: true })
  timestamp: Date;

  @Column("float", { name: "Voltage", nullable: true, precision: 12 })
  voltage: number;

  @Column("float", { name: "Current", nullable: true, precision: 12 })
  current: number;

  @Column("float", { name: "Power", nullable: true, precision: 12 })
  power: number;

  @Column("float", { name: "Energy", nullable: true, precision: 12 })
  energy: number;

  @Column("float", { name: "Temperature", nullable: true, precision: 12 })
  temperature: number;

  @Column("float", { name: "Irradiance", nullable: true, precision: 12 })
  irradiance: number;

  @ManyToOne(() => Solarpanel, (solarpanel) => solarpanel.powerGenerationData)
  @JoinColumn([{ name: "PanelID", referencedColumnName: "panelId" }]) // 注意這裡的 name 屬性
  solarpanel: Solarpanel;
}
