import os
import subprocess
from flask import Flask, render_template,url_for,request,Response,send_file,abort

# ------- CONFIG ------- #
title="树木密度监测"
mroot='~/0831_code_AdaTreeFormer/'
img_dir=[mroot+'data/test_data/images/',mroot+'predictions_images/']
streamtype='text/event-stream'
testmsg = "[test] 测试Jinja2语法后端输出 \n\nImg name:  ['IMG_000'] Error:  0.0 GT count:  0 Model out:  0.0\nImg name:  ['IMG_000'] Error:  0.0 GT count:  0 Model out:  0.0\nImg name:  ['IMG_000'] Error:  0.0 GT count:  0 Model out:  0.0000001\n\n"
pre2="""
> bash # 

632 - INFO - data_dir       :	data
632 - INFO - data_dir_shot  :	data
632 - INFO - dataset        :	TC
632 - INFO - lr             :	1e-05
632 - INFO - weight_decay   :	0.0001
633 - INFO - ema_decay      :	0.99
633 - INFO - resume         :	
633 - INFO - max_epoch      :	200
633 - INFO - val_epoch      :	1
633 - INFO - val_start      :	0
633 - INFO - batch_size     :	4
633 - INFO - batch_size_shot:	4
633 - INFO - device         :	0
633 - INFO - num_workers    :	0
633 - INFO - ot             :	0.1
633 - INFO - tv             :	0.01
633 - INFO - crop_size      :	256
633 - INFO - reg            :	1
633 - INFO - num_of_iter_in_ot:	100
633 - INFO - norm_cood      :	0
633 - INFO - run_name       :	New
633 - INFO - consistency    :	1
633 - INFO - consistency_ramp:	200
633 - INFO - scale_factor   :	4
667 - INFO - using 1 gpus
122 - INFO - random initialization
> 123 - INFO - -----Epoch 0/7-----
360 - INFO - Epoch 0 Train, Loss: 692.47, Count s2s Loss: 147.33, t2s Loss: 158.30, Count s2t Loss: 170.91, Count t2t Loss: 162.76, Attention Loss: 5229.70,Consistency Loss: 0.70, MSE: 261.77, MAE: 158.30, Cost 752.2 sec
691 - INFO - Epoch 0 Val, MSE: 251.80, MAE: 179.64, Cost 41.3 sec
694 - INFO - save best mse 251.80 mae 179.64 model epoch 0
> 673 - INFO - -----Epoch 1/7-----
619 - INFO - Epoch 1 Train, Loss: 523.10, Count s2s Loss: 101.31, t2s Loss: 108.78, Count s2t Loss: 136.81, Count t2t Loss: 130.61, Attention Loss: 3883.11,Consistency Loss: 0.71, MSE: 163.64, MAE: 108.78, Cost 741.9 sec
818 - INFO - Epoch 1 Val, MSE: 241.16, MAE: 171.83, Cost 40.2 sec
822 - INFO - save best mse 241.16 mae 171.83 model epoch 1
> 638 - INFO - -----Epoch 2/7-----
587 - INFO - Epoch 2 Train, Loss: 492.34, Count s2s Loss: 93.87, t2s Loss: 99.53, Count s2t Loss: 131.52, Count t2t Loss: 127.22, Attention Loss: 3001.81,Consistency Loss: 0.75, MSE: 156.49, MAE: 99.53, Cost 741.9 sec
667 - INFO - Epoch 2 Val, MSE: 295.70, MAE: 201.00, Cost 40.1 sec
> 670 - INFO - -----Epoch 3/7-----
388 - INFO - Epoch 3 Train, Loss: 447.64, Count s2s Loss: 90.78, t2s Loss: 95.59, Count s2t Loss: 114.55, Count t2t Loss: 110.64, Attention Loss: 2376.97,Consistency Loss: 0.74, MSE: 148.35, MAE: 95.59, Cost 741.7 sec
600 - INFO - Epoch 3 Val, MSE: 232.96, MAE: 165.67, Cost 40.2 sec
603 - INFO - save best mse 232.96 mae 165.67 model epoch 3
> 794 - INFO - -----Epoch 4/7-----
421 - INFO - Epoch 4 Train, Loss: 436.85, Count s2s Loss: 87.84, t2s Loss: 90.78, Count s2t Loss: 114.71, Count t2t Loss: 110.41, Attention Loss: 1906.30,Consistency Loss: 0.76, MSE: 143.91, MAE: 90.78, Cost 741.6 sec
532 - INFO - Epoch 4 Val, MSE: 254.47, MAE: 181.40, Cost 40.1 sec
> 535 - INFO - -----Epoch 5/7-----
304 - INFO - Epoch 5 Train, Loss: 427.17, Count s2s Loss: 86.48, t2s Loss: 90.34, Count s2t Loss: 112.84, Count t2t Loss: 106.79, Attention Loss: 1517.66,Consistency Loss: 0.79, MSE: 142.57, MAE: 90.34, Cost 740.8 sec
601 - INFO - Epoch 5 Val, MSE: 267.02, MAE: 176.21, Cost 40.3 sec
> 604 - INFO - -----Epoch 6/7-----
973 - INFO - Epoch 6 Train, Loss: 426.18, Count s2s Loss: 82.02, t2s Loss: 85.10, Count s2t Loss: 117.98, Count t2t Loss: 112.33, Attention Loss: 1206.50,Consistency Loss: 0.77, MSE: 134.58, MAE: 85.10, Cost 742.4 sec
261 - INFO - Epoch 6 Val, MSE: 231.37, MAE: 154.45, Cost 40.3 sec
264 - INFO - save best mse 231.37 mae 154.45 model epoch 6
> 190 - INFO - -----Epoch 7/7-----
618 - INFO - Epoch 7 Train, Loss: 427.52, Count s2s Loss: 80.74, t2s Loss: 84.89, Count s2t Loss: 119.80, Count t2t Loss: 115.12, Attention Loss: 956.11,Consistency Loss: 0.78, MSE: 133.74, MAE: 84.89, Cost 742.4 sec
762 - INFO - Epoch 7 Val, MSE: 235.41, MAE: 163.84, Cost 40.1 sec
...

end!


> bash #
"""

def execute_and_capture(bash: str):
    try:
        process = subprocess.Popen(
            bash,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1
        )

        for stdout_line in iter(process.stdout.readline, ""):
            yield f"data: {stdout_line.strip()}\n\n"  # stream each line as SSE msg

        # error check
        for stderr_line in iter(process.stderr.readline, ""):
            yield f"data: [THISOE_PYERROR] {stderr_line.strip()}\n\n"\

        process.stdout.close()
        process.stderr.close()
        process.wait()
        yield "data: ENDSTREAM\n\n"

    except Exception as e:
        print(f"Failed to execute: {e}")

def SSE(path: str, bash=''):
    if bash == '':
        cmd=f"bash -c 'python ~/public_html/{path}'"
    else:
        cmd=f"bash -c '{bash} && python {path}'"
    return Response(execute_and_capture(cmd),mimetype=streamtype)



# ------- WEB MAIN ------- #

app = Flask(__name__)

# single-page frontend
@app.route('/client')
def index():
    return render_template('index.html',
    title=title,
    bash_log=testmsg,
    pre2=pre2
    )


# API
@app.route('/api/ping')
def stream_ping():
    return SSE('test_streaming.py')

@app.route('/api/test')
def stream_test():
    return SSE(mroot+'test.py', 'source ~/miniconda3/bin/activate 0831_env_AdaTreeFormer')

# @app.route('/api/train')
# def stream_train():
#     return SSE(mroot+'train.py', 'source ~/miniconda3/bin/activate 0831_env_AdaTreeFormer')

@app.route('/api/img')
def get_img():
    folder = request.args.get('dir')
    img = request.args.get('img')
    itype = 'jpg'
    if not img or not folder:
        abort(400, description="Missing param")
    if folder=="ori":
        file_path=os.path.expanduser(img_dir[0]+img+'.'+itype)
    elif folder=="pre":
        itype = 'png'
        file_path=os.path.expanduser(img_dir[1]+img+'.'+itype)
    else:
        abort(400, description="Invalid param")
    if os.path.exists(file_path):
        return send_file(file_path, mimetype='image/'+itype)
    else:
        abort(404, description="IMG NF: "+file_path)


# ------- SERV ------- #
if __name__ == "__main__":
    app.run(
        # debug=True,
        port=2000
    )