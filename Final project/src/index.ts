import "reflect-metadata";
import express from "express";
import morgan from "morgan"; // 引入 morgan
import * as dotenv from "dotenv";
import { DataSource } from "typeorm"; //  引入 DataSource
import { Solarpanel } from "./entity/Solarpanel";
import { Maintenancerecord } from "./entity/Maintenancerecord";
import { Powergenerationdata } from "./entity/Powergenerationdata";
import { User } from "./entity/User";
import { Alarm } from "./entity/Alarm";

import cors from "cors";

const app = express();
const port = 3300;
const { v4: uuidv4 } = require("uuid");
dotenv.config(); // 讀取 .env 檔案

// 建立 DataSource 物件 (TypeORM 會根據 ormconfig.json 自動建立)
const AppDataSource = new DataSource({
  name: "default",
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ["src/entity/*.ts"],
});

AppDataSource.initialize()
  .then(async (connection) => {
    app.use(express.json());
    app.use(morgan("dev")); // 使用 "dev" 格式，顯示詳細的 request 資訊

    app.use(
      cors({
        origin: "*", // 允許所有來源的請求 (不安全)
      })
    );

    const createCRUD = (entity) => {
      return {
        list: async (req, res) => {
          try {
            const data = await AppDataSource.manager.find(entity);
            res.json(data);
          } catch (error) {
            res.status(500).json({ error: "Failed to fetch data" });
          }
        },
        create: async (req, res) => {
          try {
            const newItem = AppDataSource.manager.create(entity, req.body);
            await AppDataSource.manager.save(newItem);
            res.status(201).json({ message: "Item created", data: newItem });
          } catch (error) {
            res.status(500).json({ error: "Failed to create data" });
          }
        },
        update: async (req, res) => {
          try {
            await AppDataSource.manager.update(entity, req.params.id, req.body);
            res.json({ message: "Item updated" });
          } catch (error) {
            res.status(500).json({ error: "Failed to update data" });
          }
        },
        delete: async (req, res) => {
          try {
            await AppDataSource.manager.delete(entity, req.params.id);
            res.json({ message: "Item deleted" });
          } catch (error) {
            res.status(500).json({ error: "Failed to delete data" });
          }
        },
        findById: async (req, res) => {
          try {
            const id = req.params.id;
            const data = await AppDataSource.manager.findOneBy(entity, { id });
            if (data) {
              res.json(data);
            } else {
              res.status(404).json({ error: "Item not found" });
            }
          } catch (error) {
            res.status(500).json({ error: "Failed to fetch data" });
          }
        },
      };
    };

    // 使用範例：
    const solarPanelCRUD = createCRUD(Solarpanel);
    app.get("/api/solarpanels", solarPanelCRUD.list);
    app.post("/api/solarpanels", solarPanelCRUD.create);
    app.put("/api/solarpanels/:id", solarPanelCRUD.update);
    app.delete("/api/solarpanels/:id", solarPanelCRUD.delete);
    app.get("/api/solarpanels/:id", solarPanelCRUD.findById);

    const maintenancerecordCRUD = createCRUD(Maintenancerecord);
    app.get("/api/maintenance", maintenancerecordCRUD.list);
    app.post("/api/maintenance", maintenancerecordCRUD.create);
    app.put("/api/maintenance/:id", maintenancerecordCRUD.update);
    app.delete("/api/maintenance/:id", maintenancerecordCRUD.delete);
    app.get("/api/maintenance/:id", maintenancerecordCRUD.findById);

    const userCRUD = createCRUD(User);
    app.get("/api/user", userCRUD.list);
    app.post("/api/user", userCRUD.create);
    app.put("/api/user/:id", userCRUD.update);
    app.delete("/api/user/:id", userCRUD.delete);
    app.get("/api/user/:id", userCRUD.findById);

    const alarmCRUD = createCRUD(Alarm);
    app.get("/api/alarm", alarmCRUD.list);
    app.post("/api/alarm", alarmCRUD.create);
    app.put("/api/alarm/:id", alarmCRUD.update);
    app.delete("/api/alarm/:id", alarmCRUD.delete);
    app.get("/api/alarm/:id", alarmCRUD.findById);

    const powergenerationdataCRUD = createCRUD(Powergenerationdata);
    app.get("/api/powergenerationdata", powergenerationdataCRUD.list);
    app.post("/api/powergenerationdata", powergenerationdataCRUD.create);
    app.put("/api/powergenerationdata/:id", powergenerationdataCRUD.update);
    app.delete("/api/powergenerationdata/:id", powergenerationdataCRUD.delete);
    app.get("/api/powergenerationdata/:id", powergenerationdataCRUD.findById);

    //////////////////////////////
    // Get Location
    //////////////////////////////
    app.get("/api/locations", async (req, res) => {
      // 新增 API 端點
      try {
        const locations = await connection
          .getRepository(Solarpanel)
          .createQueryBuilder("solarPanel")
          .select("DISTINCT solarPanel.location", "location") //  查詢所有不同的地點
          .orderBy("solarPanel.location", "ASC")
          .getRawMany();

        res.json(locations.map((row) => row.location)); //  返回地點列表
      } catch (error) {
        console.error("查詢錯誤：", error);
        res.status(500).json({ error: "伺服器錯誤" });
      }
    });

    ////////////////////////////
    // Solar Panel 發電量統計
    ////////////////////////////
    app.get("/api/solar-panel-total-output", async (req, res) => {
      // 修改 API endpoint 名稱
      try {
        const solarPanels = await connection
          .getRepository(Solarpanel)
          .createQueryBuilder("solarpanel")
          .leftJoinAndSelect(
            "solarpanel.powerGenerationData",
            "powerGenerationData"
          )
          .select("solarpanel.*")
          .addSelect("SUM(powerGenerationData.Energy)", "totalEnergy")
          .groupBy("solarpanel.panelId")
          .getRawMany();
        const dataWithId = solarPanels.map((item) => ({
          ...item,
          id: uuidv4(),
        }));
        res.json(dataWithId);
      } catch (error) {
        console.error("查詢錯誤：", error);
        res.status(500).json({ error: "伺服器錯誤" });
      }
    });

    /////////////////////////////
    // 使用者 Solar Panel 發電量排名
    /////////////////////////////
    app.get("/api/user-solar-panel-ranking", async (req, res) => {
      try {
        // 建立查詢 (移除所有篩選條件)
        const userSolarPanelRanking = await connection
          .getRepository(User)
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.solarpanels", "solarPanel")
          .leftJoinAndSelect(
            "solarPanel.powerGenerationData",
            "powerGenerationData"
          )
          .select("user.userId", "userId")
          .addSelect("user.username", "username")
          .addSelect("user.role", "role")
          .addSelect("SUM(powerGenerationData.Energy)", "totalEnergy")
          .groupBy("user.userId")
          .orderBy("totalEnergy", "DESC")
          .getRawMany();

        res.json(userSolarPanelRanking);
      } catch (error) {
        console.error("查詢錯誤：", error);
        res.status(500).json({ error: "伺服器錯誤" });
      }
    });

    /////////////////////////////
    // Solar Panel 故障統計
    /////////////////////////////
    app.get("/api/solar-panel-failures/:panelId", async (req, res) => {
      const panelId = parseInt(req.params.panelId);

      try {
        // 建立查詢
        const failures = await connection
          .getRepository(Alarm)
          .createQueryBuilder("alarm")
          .leftJoinAndSelect("alarm.panel", "solarPanel") // 加入 SolarPanel 的資訊
          .where("solarPanel.panelId = :panelId", { panelId })
          .getMany();

        res.json(failures);
      } catch (error) {
        console.error("查詢錯誤：", error);
        res.status(500).json({ error: "伺服器錯誤" });
      }
    });

    /////////////////////////////
    // Solar Panel 維護紀錄統計
    /////////////////////////////
    app.get("/api/solar-panel-maintenance/:panelId", async (req, res) => {
      const panelId = parseInt(req.params.panelId);

      try {
        // 建立查詢
        const maintenanceRecords = await connection
          .getRepository(Maintenancerecord)
          .createQueryBuilder("maintenanceRecord")
          .leftJoinAndSelect("maintenanceRecord.panel", "solarPanel") // 加入 SolarPanel 的資訊
          .where("solarPanel.panelId = :panelId", { panelId })
          .getMany();

        res.json(maintenanceRecords);
      } catch (error) {
        console.error("查詢錯誤：", error);
        res.status(500).json({ error: "伺服器錯誤" });
      }
    });

    /////////////////////////////
    // Solar Panel Model 統計數據
    /////////////////////////////
    app.get("/api/solar-panel-brand-ranking", async (req, res) => {
      try {
        // 查詢各廠牌的總發電量、個數和排名 (移除時間篩選)
        const brandRanking = await connection
          .getRepository(Solarpanel)
          .createQueryBuilder("solarPanel")
          .leftJoinAndSelect(
            "solarPanel.powerGenerationData",
            "powerGenerationData"
          )
          .select("solarPanel.model", "brand")
          .addSelect("SUM(powerGenerationData.Energy)", "totalEnergy")
          .addSelect("COUNT(DISTINCT solarPanel.panelId)", "totalCount") // 計算每個 Model 的個數
          .groupBy("solarPanel.model")
          .orderBy("totalEnergy", "DESC")
          .getRawMany();

        // 計算總發電量
        const totalEnergy = brandRanking.reduce(
          (sum, row) => sum + row.totalEnergy,
          0
        );

        // 計算佔比、排名和平均發電量
        let rank = 1;
        const brandRankingWithStats = brandRanking.map((row) => ({
          ...row,
          percentage: ((row.totalEnergy / totalEnergy) * 100).toFixed(2),
          rank: rank++,
          averageEnergy: (row.totalEnergy / row.totalCount).toFixed(2), // 計算平均發電量
        }));

        // 再按照 model 遞增排序
        brandRankingWithStats.sort((a, b) => a.brand.localeCompare(b.brand));

        res.json(brandRankingWithStats);
      } catch (error) {
        console.error("查詢錯誤：", error);
        res.status(500).json({ error: "伺服器錯誤" });
      }
    });

    /////////////////////////////
    // Solar Panel 溫度及地點發電量統計
    /////////////////////////////
    app.get("/api/solar-panel-temperature-power", async (req, res) => {
      const location = req.query.location;
      const startDate = req.query.start_date;
      const endDate = req.query.end_date;

      try {
        // 建立查詢
        const data = await connection
          .getRepository(Solarpanel)
          .createQueryBuilder("solarPanel")
          .leftJoinAndSelect(
            "solarPanel.powerGenerationData",
            "powerGenerationData"
          )
          .select("solarPanel.panelId", "panelId")
          .addSelect("solarPanel.location", "location")
          .addSelect("DATE(powerGenerationData.Timestamp)", "date")
          .addSelect("TIME(powerGenerationData.Timestamp)", "time")
          .addSelect("powerGenerationData.Temperature", "temperature")
          .addSelect("powerGenerationData.Power", "power")
          .where("solarPanel.location = :location", { location })
          .andWhere(
            "powerGenerationData.Timestamp BETWEEN :startDate AND :endDate",
            { startDate, endDate }
          )
          .getRawMany();

        res.json(data);
      } catch (error) {
        console.error("查詢錯誤：", error);
        res.status(500).json({ error: "伺服器錯誤" });
      }
    });
    // ... 其他 API 路由 (更新、刪除等)

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
