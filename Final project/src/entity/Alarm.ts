import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Solarpanel } from "./Solarpanel";
import { User } from "./User";


@Index("PanelID", ["panelId"], {})
@Entity("alarm", { schema: "solar_panel_monitoring" })
export class Alarm {
  @PrimaryGeneratedColumn({ type: "int", name: "AlarmID" })
  alarmId: number;

  @Column("int", { name: "PanelID", nullable: true })
  panelId: number;

  @Column("datetime", { name: "AlarmTime", nullable: true })
  alarmTime: Date;

  @Column("varchar", { name: "AlarmType", nullable: true, length: 255 })
  alarmType: string;

  @Column("varchar", { name: "Status", nullable: true, length: 50 })
  status: string;

  @Column("varchar", { name: "Handler", nullable: true, length: 255 })
  handler: string | null;

  @Column("datetime", { name: "HandleTime", nullable: true })
  handleTime: Date | null;

  @Column("varchar", { name: "HandleResult", nullable: true, length: 255 })
  handleResult: string | null;

  @ManyToOne(() => Solarpanel, (solarpanel) => solarpanel.alarms)
  @JoinColumn([{ name: "PanelID", referencedColumnName: "panelId" }])
  panel: Solarpanel;

  @ManyToMany(() => User, (user) => user.alarms)
  @JoinTable({
    name: "AlarmHandling", // 连接表名稱
    joinColumn: {
      name: "alarmId",
      referencedColumnName: "alarmId"
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "userId"
    }
  })
  users: User[];
}
