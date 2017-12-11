
from flask.ext.login import login_required, login_user, logout_user

import os

from app import app,db
from flask import request,render_template,flash,abort,url_for,redirect,session,Flask,g



@app.route('/')
def index():
    print("fdsfsfdsfdsa-46656565")
    return render_template("index.html")



