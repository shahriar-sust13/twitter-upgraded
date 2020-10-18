from flask_mysqldb import MySQL 
import MySQLdb.cursors
import json

def already_follow(mysql, id, following_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM follow WHERE user_id=%s AND following_id=%s', (id, following_id))
    account = cursor.fetchone()
    mysql.connection.commit()
    if account:
        return True
    return False

def follow_user(mysql, id, following_id):
    if already_follow(mysql, id, following_id) == True:
        return {'result':400}
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('INSERT INTO follow VALUES(%s, %s)', (id, following_id))
    account = cursor.fetchone()
    mysql.connection.commit()
    return {'result':200}

def post_tweet(mysql, author_id, text):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('INSERT INTO tweet VALUES(NULL, %s, %s)', (author_id, text))
    mysql.connection.commit()
    return {'result':200}

def get_author_tweet(mysql, author_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM tweet WHERE author_id=%s', ([author_id]))
    data = cursor.fetchall()
    mysql.connection.commit()
    tweets = []
    user = get_user_info(mysql, author_id)
    user = json.loads(user)
    for tweet in data:
        tweet['author_name'] = user[0]['name']
        tweets.append(tweet)
    tweets = json.dumps(tweets)
    return tweets

def get_following_list(mysql, user_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT following_id FROM follow WHERE user_id=%s', ([user_id]))
    data = cursor.fetchall()
    mysql.connection.commit()
    return data

def generate_newsfeed(mysql, owner_id):
    following_ids = get_following_list(mysql, owner_id)
    newsfeed = []
    for following in following_ids:
        tweets = get_author_tweet(mysql, int(following['following_id']))
        tweets = json.loads(tweets)
        for tweet in tweets:
            newsfeed.append(tweet)

    print(newsfeed)

    newsfeed = json.dumps(newsfeed)

    return newsfeed

def get_all_users(mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM user')
    data = cursor.fetchall()
    mysql.connection.commit()
    data = json.dumps(data)
    return data

def get_user_info(mysql, user_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM user WHERE id=%s', ([user_id]))
    data = cursor.fetchall()
    mysql.connection.commit()
    data = json.dumps(data)
    return data