// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Solarpanel } from "./entity/Solarpanel";
import { Maintenancerecord } from "./entity/Maintenancerecord";
import { Powergenerationdata } from "./entity/Powergenerationdata";
import { User } from "./entity/User";
import { Alarm } from "./entity/Alarm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Solarpanel, Maintenancerecord, Powergenerationdata, User, Alarm],
});
