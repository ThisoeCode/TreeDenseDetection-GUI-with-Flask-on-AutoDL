# CONFIG
title='树木密度监测'

testmsg = "[test] 测试Jinja2语法后端输出 \n\nImg name:  ['IMG_000'] Error:  0.0 GT count:  0 Model out:  0.0\nImg name:  ['IMG_000'] Error:  0.0 GT count:  0 Model out:  0.0\nImg name:  ['IMG_000'] Error:  0.0 GT count:  0 Model out:  0.0000001\n"



# MAIN
from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route('/client', methods=['GET'])
def index():
    
    return render_template('index.html',title=title,bashLog=testmsg)


if __name__ == "__main__":
    app.run(debug=True, port=2000)
