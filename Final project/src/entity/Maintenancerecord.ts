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
@Entity("maintenancerecord", { schema: "solar_panel_monitoring" })
export class Maintenancerecord {
  @PrimaryGeneratedColumn({ type: "int", name: "RecordID" })
  recordId: number;

  @Column("int", { name: "PanelID" }) // 移除 nullable: true
  panelId: number;

  @Column("datetime", { name: "MaintenanceDate" }) // 移除 nullable: true
  maintenanceDate: Date;

  @Column("varchar", { name: "Maintainer", length: 255 }) // 移除 nullable: true
  maintainer: string;

  @Column("varchar", { name: "Description", nullable: true, length: 255 }) 
  description: string | null;

  @Column("varchar", { name: "Result", length: 255 }) // 移除 nullable: true
  result: string;

  @ManyToOne(() => Solarpanel, (solarpanel) => solarpanel.maintenancerecords)
  @JoinColumn([{ name: "PanelID", referencedColumnName: "panelId" }])
  panel: Solarpanel;
}