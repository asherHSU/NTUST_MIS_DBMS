# 太陽能監控系統 (後端)

## 專案概述

這個專案是太陽能監控系統的後端 API，使用 Node.js、Express.js 和 TypeORM 框架開發，提供 RESTful API 來管理和查詢太陽能板的數據、警報和維護記錄等資訊。

## 功能

* 提供 RESTful API 端點，用於：
    * 新增、查詢、更新和刪除 Solar Panel 資料
    * 新增、查詢、更新和刪除 Maintenance Record 資料
    * 新增、查詢、更新和刪除 Power Generation Data 資料
    * 新增、查詢、更新和刪除 User 資料
    * 新增、查詢、更新和刪除 Alarm 資料
    * 新增、查詢、更新和刪除 Alarm Handling 資料
* 交叉查詢 API 端點：
    * Solar Panel 發電量統計
    * 使用者 Solar Panel 發電量排名
    * Solar Panel 故障統計
    * Solar Panel 維護記錄統計
    * 警報統計
    * 使用者警報處理統計
* 使用者驗證和授權

## 技術

* Node.js
* Express.js
* TypeScript
* TypeORM
* MySQL
* JWT (JSON Web Token)

## 安裝

1.  複製此 repository。
2.  在專案目錄下執行 `npm install` 安裝所有依赖项。

## 設定

1.  建立 `.env` 檔案，並設定以下環境變數：
    *   `DB_HOST`
    *   `DB_PORT`
    *   `DB_USERNAME`
    *   `DB_PASSWORD`
    *   `DB_NAME`
    *   `JWT_SECRET`
2.  建立 `ormconfig.json` 檔案，並設定資料庫連線資訊。

## 執行

在專案目錄下執行 `npm run dev` 啟動開發伺服器。

## 建置

在專案目錄下執行 `npm run build` 建置 production 版本的應用程式。

## 測試

在專案目錄下執行 `npm test` 執行測試。

## API 文件

API 文件可以使用 Swagger 或其他工具生成。

## 作者

B11209032 許良宏
