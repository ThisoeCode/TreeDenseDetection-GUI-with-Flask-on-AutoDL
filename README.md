<h1>树木密度监测模型的全栈推流展示GUI</h1>
#Flask #jQuery

# 目录

> 快捷跳转：
> [作业](#mission-for-teammates-作业) / [TODO](#thisoes-memo) / **[遇难说明](#遇难presentation)**

- **[服务器使用说明（英文）](#documentation)**
  - [启动服务器的流程](#backend-launching)
- **[开发团队任务书](#开发团队任务书)**
  - [本repo使用须知](#github使用须知)
  - [待办事项兼工作日志](#todo-list--roadmap)



<br>

# Documentation

## Backend Launching

1. Check out repo diff, then upload updated source files through FTP.

2. Open an SSH, create tunnel at port `2000`.
```bash
cd /public_html
chmod +x proxy_in_instance
./proxy_in_instance
```

3. Open another SSH, run Flask app.
```bash
cd /public_html
python serv.py
```

4. Login to _AutoDL_ tunneling tool.
```bat
ssh ...
::<password>
2000
```

5. Visit [`localhost:2000/client?0`](http://localhost:2000/client?0) for test result.



<br>

# 开发团队任务书

## GitHub使用须知

### 检查版本区别并更新ftp时忽略以下文件
- `README.md` - GitHub说明文档
- `.gitignore` - Git配置
- `LOCALTEST.bat` - 项目运行测试启动器（Windows用）


## TODO List & Roadmap

> ps.
> `+`完成； `-`待办； `!`进行中； `#`会议。

### Mission for Teammates 作业（
```diff
+ 平面设计前端布局
+ 在`serv.py`里`def`一个读取程序输出的数据的函数
+ 按版本区别更新ftp, 按[流程](#backend-launching-启动后端的流程)跑测试页
+ 在`img.py`中def一个函数`get_img(id)`：
# - 函数必需一个参数：图片编号`id`（如`536`）；
# - 函数需返回`"GT_IMG_" + id + ".mat"`对应的路径辞典，辞典中包含`origin`（原始影像的路径）和`predict`（预测结果图片的路径），例如：
#   return {
#     "origin": "data.jpg",
#     "predict": "pre.jpg"
#   }
! 注：预测结果图片输出在 root/public_html/img/ 文件夹下。
+ 提供“模型运行”页以及“训练模型”页触发的`.py`文件相对路径
+ 需将"test.py"和"train.py"内的所有`print()`添加param:`flush=True`。见例：
# - print('Hello world', flush=True)
#   （是为了向前端建立实时推流时捕获print内容）
! 请决定：每次开机是否只允许test.py和train.py运行一次，若不是：
# ? 将"test.py"和"train.py"末尾，一切执行结束时`print('ENDSTREAM', flush=True)`
#   （作为前端的推流终止旗标）
- 测试`public_html\static\img\mat2png.py`
# - 解除最后一行注释，跟`IMG_158.mat`一起上传ftp，运行并debug
# - Q.输出的png是同文件夹下吗？  A. _______


```

### Thisoe's memo
```diff
+ 测试页: 测试`render_template`(CSS,JS,和后端变量发送到前端)
+ 查找Flask是否动态渲染——持续接受后端数据以及前后端互动性问题
+ 双页面切换用jQuery在前端虚拟连接（下记为前提）
! 前端布局图代码化
+ jQuery建立SSE接口 `EventSource`
+ 联络以确认数据类型
+ 建立后端SSE接口
! 联络以询问"模型甲乙丙丁"（#p1 <select>）的后端逻辑需求
! 等待决定：若test&train需运行多次，使用`threading.Lock()`并`global process`（记得在顶层`process = None`）
! 测试数据推流全过程
- 将'?1'页左栏那样的文件名列在一个array中。
# - 例：
#   mat_list = ['IMG_158.mat','IMG_167.mat','IMG_233.mat']
-


```

## 遇难presentation()

- 两人团队，甲负责模型，乙负责web前后端。

- 是Linux。

### Torch模型 `test.py`
在`/root/code_TreeFormer/`文件夹下，有`test.py`用于执行torch模型，会实时print出数据。

> 运行方法：SSH执行指令`conda activate 0831_env_AdaTreeFormer`然后`python xxxxx/test.py`，**能正常执行**。

### Flask后端 `serv.py`
在`/root/public_html/`文件夹下，有Flask后端`serv.py`。
其中有API路由要执行`test.py`并将其print的内容实时推流到前端，于是包括来自`test.py`的报错在内的所有print都会在前端显示。

代码片段：
```py
import subprocess
subprocess.Popen(
    # 注意这里是`source activate ...`
    "bash -c 'source activate env_TreeFormer && python /root/code_TreeFormer/test.py'",
    shell=True,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    bufsize=1
)
# ...
```
（[见源代码](https://github.com/ThisoeCode/TreeDenseDetection-GUI-with-Flask-on-AutoDL/blob/main/public_html/serv.py#L71)）

可以成功运行（前端能实时显示来自`test.py`的print），但会报以下错，并没有traceback提示到底哪里出了问题）
```diff
- ERROR: /root/miniconda3/envs/env_TreeFormer/lib/python3.8/site-packages/torch/functional.py:568: UserWarning: torch.meshgrid: in an upcoming release, it will be required to pass the indexing argument. (Triggered internally at  ../aten/src/ATen/native/TensorShape.cpp:2228.)
```

尝试了将代码中的 ...`"bash -c 'source activate `... 改成 ...`"bash -c 'conda activate `... 则会报错说找不到"conda"。

### 无知者无畏（bushi

- 我们俩都不会使`virtualenv`，我没啥Python和Linux基础知识 只会JS/TS/PHP那些web的东西，Flask这回是头回碰。

创`public_html/`的时候，在该文件夹下SSH过`virtualenv venv`并activate。后来删了`venv/`文件夹再运行，结果没差别。

- 我不会用`subprocess.Popen`（[这么用了](https://github.com/ThisoeCode/TreeDenseDetection-GUI-with-Flask-on-AutoDL/blob/main/public_html/serv.py#L10)），问题有可能处在这？是否需要在`serv.py`执行bash时设置环境？的话，如何设置？

### GPT的解答待测试
[这里](https://github.com/ThisoeCode/TreeDenseDetection-GUI-with-Flask-on-AutoDL/blob/main/public_html/serv.py#L71)第二个param的字符串最前添加`source ~/.bashrc && `
