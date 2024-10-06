import subprocess
import threading
lock = threading.Lock()

# ------- CONFIG ------- #
title='树木密度监测'
testmsg = "[test] 测试Jinja2语法后端输出 \n\nImg name:  ['IMG_000'] Error:  0.0 GT count:  0 Model out:  0.0\nImg name:  ['IMG_000'] Error:  0.0 GT count:  0 Model out:  0.0\nImg name:  ['IMG_000'] Error:  0.0 GT count:  0 Model out:  0.0000001\n\n"
streamtype='text/event-stream'

process = None

def execute_and_capture(path: str):
    global process
    try:
        process = subprocess.Popen(
            ['python', path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1
        )

        for stdout_line in iter(process.stdout.readline, ""):
            yield f"data: {stdout_line.strip()}\n\n"  # stream each line as SSE msg
        process.stdout.close()
        process.wait()

        # error check
        if process.returncode != 0:
            stderr_output = process.stderr.read()
            yield f"data: ERROR: {stderr_output.strip()}\n\n"
        process.stderr.close()

    except Exception as e:
        print(f"Failed to execute `{path}`: {e}")

def sse(path):
    return Response(execute_and_capture(path),mimetype=streamtype)

def ban_thread():
    return Response("进程已在运行或只允许运行一次。", status=409)



# ------- WEB MAIN ------- #
from flask import Flask, render_template, url_for, Response

app = Flask(__name__)

# single-page frontend
@app.route('/client')
def index():
    return render_template('index.html',
    title=title,
    bash_log=testmsg,
    mat_list=['IMG_158.mat','IMG_167.mat','IMG_233.mat']
    )


# API
@app.route('/api/ping')
def stream_ping():
    # global process
    # with lock:
    #     if process is None:
    #         return sse('public_html/test_streaming.py')
    #     else:
    #         print("400: PROCESSING")
    #         return ban_thread()
    return sse('public_html/test_streaming.py')

@app.route('/api/test')
def stream_test():
    global process
    with lock:
        if process is None:
            return sse('../0831_code_AdaTreeFormer/test.py')
        else:
            return ban_thread()

@app.route('/api/train')
def stream_train():
    global process
    with lock:
        if process is None:
            return sse('../0831_code_AdaTreeFormer/train.py')
        else:
            return ban_thread()


if __name__ == "__main__":
    app.run(debug=True, port=2000)
