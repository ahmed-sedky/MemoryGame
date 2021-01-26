from flask import Flask, render_template ,request,url_for,redirect,session #import flask class
from datetime import date

import mysql.connector
mydb = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    passwd = '',
    database = 'memo game'
)
myCursor = mydb.cursor()

app = Flask(__name__) 
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SECRET_KEY'] = "secret"

@app.route('/',methods = {'GET' ,'POST'})
def login():
    if request.method == 'POST':
        username    = request.form['username']
        pass1       = request.form['password']
        if username == '' or pass1 == '':
            msg = "Your Username or Password is empty"
            return render_template('signin.html', Msg =msg)
        else:
            myCursor2 = mydb.cursor()
            sql ="SELECT id FROM game WHERE player_name =%s AND password =%s"
            val = (username,pass1)
            myCursor2.execute(sql,val)
            check_player = myCursor2.fetchall()
            print(myCursor2.rowcount)
            if myCursor2.rowcount > 0:
                session['username']     = username
                session ['password']    = pass1
                return redirect(url_for('mode')) 
            else:
                msg = "Your Username or Password Is Not Correct"
                return render_template('signin.html', Msg =msg)
    else:
        return render_template('signin.html')


@app.route('/logout')
def logout():
    session.clear()
    return render_template('signin.html')

@app.route('/register',methods = {'GEt' ,'POST'})
def register():
    if request.method == 'POST':
        username    = request.form['username']
        pass1       = request.form['password']
        today = date.today()
        if username == '' or pass1 == '':
            msg = "Your Username or Password is empty"
            return render_template('signup.html', Msg =msg)
        else:
            try:
                myCursor4 = mydb.cursor()
                sql ="INSERT INTO game (player_name,password,date_entry) VALUES (%s,%s,%s)"
                val = (username,pass1,today)
                myCursor4.execute(sql,val)
                mydb.commit()
                return redirect(url_for('login'))  
            except:
                msg = "This Username ALready Exist"
                return render_template('signup.html', Msg =msg)
    else:
        return render_template('signup.html')
    
@app.route('/main/<string:mode>' , methods={'GET', 'POST'})
def index(mode):
    if 'username' in session:
        if request.method == 'POST':
            myCursor6 = mydb.cursor()
            sql2    = "select id from game where player_name=%s"
            val2    = (session['username'], )
            myCursor6.execute(sql2,val2)
            player_id = myCursor6.fetchall()
            tries   = request.form['tries']
            minutes = request.form['minutes']
            mode    = request.form['mode']
            myCursor4 = mydb.cursor()
            print(tries, minutes)
            print(player_id[0][0])
            sql3 ="INSERT INTO player (n_tries ,minutes,p_id ,mode) VALUES(%s ,%s ,%s,%s) "
            val3 = (tries,minutes,player_id[0][0],mode)
            myCursor4.execute(sql3,val3)
            mydb.commit()
            return redirect(url_for('mode'))    
        else:
            if  mode == 'ultimate':
                class1 = "row-cols-6"
                contain = "container"
            else:
                class1 = 'row-cols-6'
                contain = "container"
            return render_template('index.html',mode_game =mode , class2 = class1 ,contain2 =contain)
    else:
        return redirect(url_for('login'))    

@app.route('/mode')
def mode():
    return render_template('mode.html')

# @app.route('/insert',methods = {'GET','POST'})
# def insert():
#     if request.method == 'POST':
#         myCursor5 = mydb.cursor()
#         sql2    = "select id from game where player_name=%s"
#         val2    = (session['username'], )
#         myCursor5.execute(sql2,val2)
#         player_id = myCursor5.fetchall()
#         tries   = request.form['tries']
#         minutes = request.form['minutes']
#         mode    = request.form['mode']
#         myCursor4 = mydb.cursor()
#         print(tries, minutes)
#         print(player_id[0][0])
#         sql3 ="INSERT INTO player (n_tries ,minutes,p_id ,mode) VALUES(%s ,%s ,%s,%s) "
#         val3 = (tries,minutes,player_id[0][0],mode)
#         myCursor4.execute(sql3,val3)
#         mydb.commit()
#         return render_template('index.html', id = player_id , try1 =tries , minutes2 =minutes)
#     else:
#         return redirect(url_for(index))
@app.route('/score',methods = {'GET','POST'})
def score():
    if request.method == 'POST':
        mode = request.form['mode']
        myCursor3 =mydb.cursor()
        sql = "SELECT game.player_name ,player.n_tries ,player.minutes , player.mode FROM game join player ON p_id = id WHERE player.mode =%s ORDER BY n_tries ASC ,minutes ASC "
        val = (mode, )
        myCursor3.execute(sql,val)
        myResult2 = myCursor3.fetchall()
        count = myCursor3.rowcount
        return render_template('score.html',players_data = myResult2 , count_players =count)
    else:
        myCursor3 =mydb.cursor()
        myCursor3.execute("SELECT game.player_name ,player.n_tries ,player.minutes , player.mode FROM game join player ON p_id = id ORDER BY n_tries ASC ,minutes ASC")
        myResult2 = myCursor3.fetchall()
        count = myCursor3.rowcount
        
        return render_template('score.html',players_data = myResult2, count_players =count)

if __name__ == '__main__':
    app.run(debug=True) 

