import pymysql

class Config:
    # 数据库配置
    DB_HOST = 'localhost'
    DB_USER = 'root'
    DB_PASSWORD = '123456'   # 替换成你的MySQL密码
    DB_NAME = 'travel_db'
    DB_CHARSET = 'utf8mb4'
    
    # 其它配置（如调试模式）
    DEBUG = True
    SECRET_KEY = 'your-secret-key'  # 用于session等安全功能，可以随机生成一个字符串