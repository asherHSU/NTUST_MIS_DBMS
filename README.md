# 國立臺灣科技大學 資訊管理系 資料庫管理系統 課程專案 (NTUST MIS DBMS Project)

## 專案描述

此專案為國立臺灣科技大學資訊管理系「資料庫管理系統」課程之成果。這是一個全端 Web 應用程式，包含：

* 一個使用 Node.js 和 TypeScript 開發的後端伺服器 (位於 `Final project` 資料夾)。
* 一個使用 React 開發的前端使用者介面 (位於 `React/my-solar-panel-app` 資料夾)。
* 相關的資料庫設計文件 (ERD) 和書面報告 (位於 `ERD` 和 `書面報告` 資料夾)。

## 主要功能 (Features)

* * * * ## 使用技術 (Technologies Used)

* **後端 (Backend):**
    * Node.js
    * TypeScript
    * Express.js * TypeORM * * **前端 (Frontend):**
    * React.js
    * * **資料庫 (Database):**
    * * SQL
    * ERD 設計
* **版本控制 (Version Control):**
    * Git
    * GitHub

## 專案結構 (Project Structure)

.
├── ERD/                     # ER 圖相關文件與資源
├── Final project/           # 後端 Node.js / TypeScript 專案
│   ├── src/                 # 原始碼
│   ├── node_modules/        # (通常不提交到 Git)
│   ├── .env                 # (不提交到 Git - 包含環境變數)
│   ├── ormconfig.json       # TypeORM 配置
│   ├── package.json         # 專案依賴與腳本
│   └── ...
├── React/my-solar-panel-app/ # 前端 React 專案
│   ├── public/
│   ├── src/                 # 原始碼
│   ├── node_modules/        # (通常不提交到 Git)
│   ├── .gitignore
│   ├── package.json         # 專案依賴與腳本
│   └── ...
├── 書面報告/                 # 包含 PDF 報告、SQL 腳本、圖表、Excel 等
└── README.md                # 本文件


## 環境設定與安裝 (Setup & Installation)

**先決條件:**

* 安裝 [Node.js](https://nodejs.org/) (建議使用 LTS 版本)
* 安裝 [Git](https://git-scm.com/)
* 安裝 資料庫系統 ([MySQL](https://www.mysql.com/))

**步驟:**

1.  **Clone 儲存庫:**
    ```bash
    git clone [https://github.com/asherHSU/NTUST_MIS_DBMS.git](https://github.com/asherHSU/NTUST_MIS_DBMS.git)
    cd NTUST_MIS_DBMS
    ```

2.  **設定後端 (`Final project`):**
    ```bash
    cd "Final project"
    npm install  # 或 yarn install
    ```
    * **環境變數:**
        * 複製 `.env.example` (如果沒有，建議你創建一個範本檔) 為 `.env`。
            ```bash
            # 如果有 .env.example
            cp .env.example .env
            # 如果沒有，請手動創建 .env
            ```
        * 編輯 `.env` 檔案，填入必要的環境變數，特別是資料庫連線資訊 (主機、端口、使用者名稱、密碼、資料庫名稱) 和任何需要的密鑰 (Secret Keys)。
            ```dotenv
            # .env 範例
            DB_TYPE=postgres # 或 mysql 等
            DB_HOST=localhost
            DB_PORT=5432 # 或 3306 等
            DB_USERNAME=your_db_user
            DB_PASSWORD=your_db_password
            DB_DATABASE=your_db_name
            # 其他必要的變數...
            ```
    * **資料庫設定:**
        1.  確保你的 資料庫伺服器正在運行。
        2.  手動建立專案所需的資料庫 (名稱需與 `.env` 中的 `DB_DATABASE` 一致)。
        3.  執行資料庫初始化腳本或遷移：
            * ```bash
                # npm run migration:run # 請確認實際指令
                ```
            * 請使用資料庫管理工具 (如 DBeaver, pgAdmin, MySQL Workbench) 或命令列工具，連接到你建立的資料庫，並執行位於 `書面報告/` 資料夾下的 `*.sql` 腳本來建立資料表和插入初始資料。 (請指明具體的 SQL 檔名)

3.  **設定前端 (`React/my-solar-panel-app`):**
    * 回到專案根目錄，然後進入前端資料夾：
        ```bash
        cd ../React/my-solar-panel-app # 或者直接 cd "D:\Database Manage System\React\my-solar-panel-app"
        npm install # 或 yarn install
        ```
    * **環境變數 (如果需要):**
        * 如果前端需要連接到後端 API 或有其他環境特定設定，可能也需要設定 `.env` 檔案。請參考前端專案的說明或程式碼。通常會設定 `REACT_APP_API_URL` 指向後端伺服器地址。
            ```dotenv
            # .env 範例 (前端)
            REACT_APP_API_URL=http://localhost:YOUR_BACKEND_PORT # 請填寫後端運行的端口
            ```

## 如何執行 (Usage)

1.  **啟動後端伺服器:**
    ```bash
    cd "../Final project" # 確保在後端目錄
    npm start # 或 npm run dev / npm run build && npm run start (請確認 package.json 中的啟動指令)
    ```
    * 後端伺服器應該會在 `.env` 或程式碼中指定的端口上運行 (例如：`http://localhost:8000`)。2.  **啟動前端應用程式:**
    ```bash
    cd "../React/my-solar-panel-app" # 確保在前端目錄
    npm start
    ```
    * 前端開發伺服器通常會在 `http://localhost:3000` 啟動，並會自動在瀏覽器中打開。

3.  **瀏覽應用程式:**
    * 在瀏覽器中打開前端應用程式的地址 (通常是 `http://localhost:3000`) 來使用。

## 作者 (Author)

* **asherHSU** - [GitHub Profile](https://github.com/asherHSU)

## License
