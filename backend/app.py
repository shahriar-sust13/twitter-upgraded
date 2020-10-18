from flask import Flask, render_template, request, redirect, url_for, session 
from flask_mysqldb import MySQL 
import MySQLdb.cursors
import helper as db_handler

app = Flask(__name__) 

app.secret_key = '12345'  
  
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345'
app.config['MYSQL_DB'] = 'twitter'

mysql = MySQL(app)

@app.route('/')
def welcome():
    return 'hello'

#@app.route('/login/<email>/<password>', methods=['GET'])
#def login(email, password):
@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    if len(email)>0 and len(password)>0:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM user WHERE email=%s AND password=%s', (email, password))
        account = cursor.fetchone()
        mysql.connection.commit()
        if account:
            print('right passowrd')
            session['user_id'] = account['id']
            session['name'] = account['name']
            session['email'] = account['email']
            if( 'user_id' in session ):
                print('logged in')
            return {'credential':200, 'user':account}
        else:
            print('wrong password')
            return {'credential':400}
    else:
        return {'credential':405}

@app.route('/follow/<id>/<following_id>', methods=['GET'])
def follow(id, following_id):
    return db_handler.follow_user(mysql, id, following_id)

@app.route('/new_tweet', methods=['POST'])
def post_tweet():
    author_id = request.form['author_id']
    text = request.form['tweet']
    return db_handler.post_tweet(mysql, author_id, text)

@app.route('/tweet/<author_id>', methods=['GET'])
def get_tweet(author_id):
    return db_handler.get_author_tweet(mysql, author_id)

@app.route('/newsfeed/<owner_id>', methods=['GET'])
def get_newsfeed(owner_id):
    return db_handler.generate_newsfeed(mysql, owner_id)

@app.route('/allusers', methods=['GET'])
def allusers():
    return db_handler.get_all_users(mysql)

@app.route('/user/<id>', methods=['GET'])
def user(id):
    return db_handler.get_user_info(mysql, id)

@app.route('/islogged', methods=['GET'])
def islogged():
    if 'user_id' in session:
        return {
            'logged': True,
            'user_id': session['user_id'],
            'name': session['name'],
            'email': session['email']
        }
    return {'logged': False}

'''
@app.route('/logged', methods=['GET'])
def logged():
    session['user_id'] = 1
    return 'hello'
'''

@app.route('/logout', methods=['GET'])
def logout():
    session.clear()
    return {'result':True}
