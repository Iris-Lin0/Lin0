from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
from config import Config

# 创建Flask应用实例
app = Flask(__name__)
# 加载配置
app.config.from_object(Config)
# 启用CORS跨域支持，允许所有域名访问（开发环境）
CORS(app)

# 获取数据库连接
def get_db_connection():
    """返回数据库连接对象，使用字典游标"""
    connection = pymysql.connect(
        host=app.config['DB_HOST'],
        user=app.config['DB_USER'],
        password=app.config['DB_PASSWORD'],
        database=app.config['DB_NAME'],
        charset=app.config['DB_CHARSET'],
        cursorclass=pymysql.cursors.DictCursor  # 返回字典格式，方便操作
    )
    return connection

# ---------- API 路由 ----------

@app.route('/api/attractions', methods=['GET'])
def get_attractions():
    """获取所有景点列表（只返回列表页需要的字段）"""
    try:
        # 获取数据库连接
        conn = get_db_connection()
        with conn.cursor() as cursor:
            # 查询语句，只选取必要的字段
            sql = """
                SELECT id, name, location, image_url, description
                FROM attractions
                ORDER BY id DESC
            """
            cursor.execute(sql)
            attractions = cursor.fetchall()
        conn.close()
        # 返回JSON格式数据
        return jsonify(attractions)
    except Exception as e:
        # 发生异常时返回错误信息，状态码500
        return jsonify({'error': str(e)}), 500

@app.route('/api/attractions/<int:id>', methods=['GET'])
def get_attraction_detail(id):
    """根据ID获取单个景点的详细信息（包含所有费用字段）"""
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql = """
                SELECT id, name, location, image_url, description,
                       transport_cost, accommodation_cost, food_cost, entertainment_cost
                FROM attractions
                WHERE id = %s
            """
            cursor.execute(sql, (id,))
            attraction = cursor.fetchone()
        conn.close()
        if attraction:
            return jsonify(attraction)
        else:
            return jsonify({'error': '景点未找到'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 可选：添加一个简单的根路由，用于测试后端是否运行
@app.route('/')
def index():
    return "TravelDream Backend is running!"

# 启动应用
if __name__ == '__main__':
    # debug=True 会启用热重载，代码修改后自动重启
    # host='0.0.0.0' 允许外部访问，如果只本地测试可以不加
    app.run(debug=app.config['DEBUG'], port=5000)