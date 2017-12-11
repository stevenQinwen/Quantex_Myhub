# -*- coding: utf-8 -*-
from flask import Flask
from flask.ext.login import LoginManager
from flask_sqlalchemy import SQLAlchemy


#加载配置文件内容
print ("加载配置文件内容")
app = Flask(__name__)
app.config.from_object('app.setting')
app.config.from_envvar('FLASKR_SETTINGS')

#创建数据库对象
print ("创建数据库对象")
db = SQLAlchemy(app)
import MySQLdb
mysql_conn= MySQLdb.connect(host='127.0.0.1', port=3306,user='root', passwd='root', db='blog_db')

#关键 -- 这里必须引入每一个模块
from app.controller import permission_management
from app.controller import Correlation_Analysis
from app.controller import Model_Evaluation
from app.controller import User_Analysis






