import subprocess
from flask import Flask, render_template,url_for,request,Response,send_file

# ------- CONFIG ------- #
from serv import title,testmsg,streamtype,img_dir,pre2,execute_and_capture

testpre1="""
number of img [val]: 161
number of img [val]: 1
Img name:  ['IMG_158'] Error:  -29.48480224609375 GT count:  128 Model out:  157.48480224609375
Img name:  ['IMG_176'] Error:  -9.658172607421875 GT count:  143 Model out:  152.65817260742188
Img name:  ['IMG_181'] Error:  4.03631591796875 GT count:  186 Model out:  181.96368408203125
Img name:  ['IMG_182'] Error:  0.80975341796875 GT count:  200 Model out:  199.19024658203125
Img name:  ['IMG_186'] Error:  -14.843948364257812 GT count:  166 Model out:  180.8439483642578
Img name:  ['IMG_188'] Error:  -9.9283447265625 GT count:  103 Model out:  112.9283447265625
Img name:  ['IMG_191'] Error:  2.348907470703125 GT count:  193 Model out:  190.65109252929688
Img name:  ['IMG_199'] Error:  19.289764404296875 GT count:  111 Model out:  91.71023559570312
Img name:  ['IMG_211'] Error:  30.285003662109375 GT count:  168 Model out:  137.71499633789062
Img name:  ['IMG_213'] Error:  15.251419067382812 GT count:  108 Model out:  92.74858093261719
Img name:  ['IMG_214'] Error:  2.0838165283203125 GT count:  88 Model out:  85.91618347167969
Img name:  ['IMG_224'] Error:  6.2875213623046875 GT count:  138 Model out:  131.7124786376953
Img name:  ['IMG_225'] Error:  19.51036834716797 GT count:  115 Model out:  95.48963165283203
Img name:  ['IMG_227'] Error:  16.813262939453125 GT count:  106 Model out:  89.18673706054688
Img name:  ['IMG_229'] Error:  12.371612548828125 GT count:  77 Model out:  64.62838745117188
Img name:  ['IMG_232'] Error:  65.88230895996094 GT count:  178 Model out:  112.11769104003906
Img name:  ['IMG_239'] Error:  12.328170776367188 GT count:  83 Model out:  70.67182922363281
Img name:  ['IMG_240'] Error:  5.493400573730469 GT count:  50 Model out:  44.50659942626953
Img name:  ['IMG_241'] Error:  25.732261657714844 GT count:  152 Model out:  126.26773834228516
Img name:  ['IMG_271'] Error:  -7.682037353515625 GT count:  153 Model out:  160.68203735351562
Img name:  ['IMG_273'] Error:  14.650634765625 GT count:  148 Model out:  133.349365234375
Img name:  ['IMG_274'] Error:  23.959014892578125 GT count:  161 Model out:  137.04098510742188
Img name:  ['IMG_279'] Error:  -7.9785003662109375 GT count:  244 Model out:  251.97850036621094
Img name:  ['IMG_281'] Error:  20.678382873535156 GT count:  113 Model out:  92.32161712646484
Img name:  ['IMG_288'] Error:  13.614166259765625 GT count:  176 Model out:  162.38583374023438
Img name:  ['IMG_296'] Error:  -3.086883544921875 GT count:  159 Model out:  162.08688354492188
Img name:  ['IMG_303'] Error:  11.423248291015625 GT count:  57 Model out:  45.576751708984375
Img name:  ['IMG_304'] Error:  -2.6336517333984375 GT count:  120 Model out:  122.63365173339844
Img name:  ['IMG_310'] Error:  17.476043701171875 GT count:  192 Model out:  174.52395629882812
Img name:  ['IMG_394'] Error:  16.755897521972656 GT count:  128 Model out:  111.24410247802734
Img name:  ['IMG_398'] Error:  34.184776306152344 GT count:  71 Model out:  36.815223693847656
Img name:  ['IMG_399'] Error:  -12.4364013671875 GT count:  67 Model out:  79.4364013671875
Img name:  ['IMG_400'] Error:  -10.789459228515625 GT count:  125 Model out:  135.78945922851562
Img name:  ['IMG_411'] Error:  7.0819854736328125 GT count:  84 Model out:  76.91801452636719
Img name:  ['IMG_412'] Error:  -3.8648681640625 GT count:  144 Model out:  147.8648681640625
Img name:  ['IMG_415'] Error:  -12.935195922851562 GT count:  127 Model out:  139.93519592285156
Img name:  ['IMG_420'] Error:  -4.331878662109375 GT count:  208 Model out:  212.33187866210938
Img name:  ['IMG_425'] Error:  9.488540649414062 GT count:  159 Model out:  149.51145935058594
Img name:  ['IMG_433'] Error:  -9.092010498046875 GT count:  145 Model out:  154.09201049804688
Img name:  ['IMG_444'] Error:  4.2037353515625 GT count:  83 Model out:  78.7962646484375
Img name:  ['IMG_445'] Error:  -14.31890869140625 GT count:  155 Model out:  169.31890869140625
Img name:  ['IMG_448'] Error:  -34.01890563964844 GT count:  215 Model out:  249.01890563964844
Img name:  ['IMG_449'] Error:  8.553787231445312 GT count:  243 Model out:  234.4462127685547
Img name:  ['IMG_456'] Error:  -11.013763427734375 GT count:  131 Model out:  142.01376342773438
Img name:  ['IMG_458'] Error:  9.839385986328125 GT count:  162 Model out:  152.16061401367188
Img name:  ['IMG_463'] Error:  9.22735595703125 GT count:  179 Model out:  169.77264404296875
Img name:  ['IMG_499'] Error:  23.209381103515625 GT count:  241 Model out:  217.79061889648438
Img name:  ['IMG_528'] Error:  -6.8202056884765625 GT count:  115 Model out:  121.82020568847656
Img name:  ['IMG_534'] Error:  -13.998260498046875 GT count:  80 Model out:  93.998260498046
Img name:  ['IMG_741'] Error:  -8.927322387695312 GT count:  149 Model out:  157.9273223876953
Img name:  ['IMG_748'] Error:  -1.3109130859375 GT count:  170 Model out:  171.3109130859375
Img name:  ['IMG_905'] Error:  -42.211181640625 GT count:  112 Model out:  154.211181640625
Img name:  ['IMG_906'] Error:  -25.956832885742188 GT count:  88 Model out:  113.95683288574219
Img name:  ['IMG_907'] Error:  -20.60211181640625 GT count:  83 Model out:  103.60211181640625
Img name:  ['IMG_908'] Error:  11.530410766601562 GT count:  139 Model out:  127.46958923339844
Img name:  ['IMG_909'] Error:  -20.3719482421875 GT count:  215 Model out:  235.3719482421875
Img name:  ['IMG_910'] Error:  15.895477294921875 GT count:  126 Model out:  110.10452270507812
Img name:  ['IMG_913'] Error:  13.6253662109375 GT count:  92 Model out:  78.3746337890625
Img name:  ['IMG_914'] Error:  -21.009613037109375 GT count:  181 Model out:  202.00961303710938
Img name:  ['IMG_917'] Error:  1.11895751953125 GT count:  151 Model out:  149.88104248046875
Img name:  ['IMG_918'] Error:  -24.401611328125 GT count:  199 Model out:  223.401611328125
best_model_mae-30.82_epoch-77.pth: mae=15.405208184852363, mse=19.78529700995695, R2=0.8175054791286568, pre=0.0, rec=0.0, f1=nan

end!
"""

def SSE():
    return Response(execute_and_capture("python public_html/test_streaming.py"),mimetype=streamtype)



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
    return SSE()

@app.route('/api/test')
def stream_test():
    return SSE()

@app.route('/api/train')
def stream_train():
    return SSE()



# ------- SERV ------- #
if __name__ == "__main__":
    app.run(debug=True, port=2333)