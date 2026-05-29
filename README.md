# 我的旅游梦 - 旅游攻略网站

## 项目简介
展示世界各地景点的详细信息及费用预算。

## 技术栈
- 前端：HTML/CSS/JS + Font Awesome
- 后端：Python Flask
- 数据库：MySQL

## 如何运行

### 1. 克隆项目
https://github.com/Iris-Lin0/Lin0.git
cd TravelDream

### 2. 安装后端依赖
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

### 3. 配置数据库
- 确保 MySQL 服务已启动。
- 创建数据库：执行 `database/travel_db.sql`（在 Navicat 或命令行中导入）。
- 修改 `backend/config.py` 中的数据库密码。

### 4. 启动后端
python app.py

### 5. 启动前端
用 VS Code 的 Live Server 打开 `frontend/index.html`。

## 注意事项
- 后端默认端口 5000，前端默认端口 5500。
- 确保没有端口冲突。