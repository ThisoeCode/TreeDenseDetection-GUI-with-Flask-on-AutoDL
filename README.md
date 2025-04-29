<h1>树木密度监测模型的推流展示GUI全栈<br>Tree-Density Model: Full-Stack Bash Streaming Presentation GUI</h1>
[#Linux](https://github.com/topics/linux) [#Flask](https://github.com/topics/flask) [#jQuery](https://github.com/topics/jquery)

# 目录

- **[服务器使用说明（英文）](#documentation)**
  - [启动服务器的流程](#backend-launching)
- **[开发团队任务书](#开发团队任务书)**
  - [本repo使用须知](#github使用须知)
  - [待办事项兼工作日志](#todo-list--roadmap)



<br>

# Documentation

## Backend Launching

1. New SSH (run `proxy_in_instance`)
```bash
cd public_html
chmod +x proxy_in_instance
./proxy_in_instance
```

2. Another new SSH (run Flask app)
```bash
python public_html/serv.py
```

3. Login `AutoDL.exe`
```bat
Port: 2000
```

Visit [localhost:2000/client?1](http://localhost:2000/client?1).



<br>

# 开发团队任务书

## GitHub使用须知

### 检查版本区别并更新ftp时忽略以下文件
- `README.md` - GitHub说明文档
- `.gitignore` - Git配置
- `LOCALTEST.bat`和`serv_localtest.py` - 项目运行测试启动器（Windows用）


## TODO List & Roadmap

> ps.
> `+`完成； `-`待办； `!`进行中；`#`注释。

### Torch Model Missions (Teammates)
```diff
+ 平面设计前端布局
+ 在`serv.py`里`def`一个读取程序输出的数据的函数
+ 按版本区别更新ftp, 按启动后端的流程跑测试页
+ 提供“模型运行”页以及“训练模型”页触发的`.py`文件相对路径
+ 需将"test.py"和"train.py"内的所有`print()`添加param:`flush=True`。见例：
# - print('Hello world', flush=True)
#   （是为了向前端建立实时推流时捕获print内容）
+ 将"test.py"和"train.py"末尾，一切执行结束时`print('ENDSTREAM', flush=True)`（作为前端的推流终止旗标）
+ 提供 “?2” 页（train.py模拟运行）所需log数据
+ 提供 原始影像 和 预测结果 两个图片文件夹的绝对路径
# - ~~~/predictions_images #预测结果
# - ~~~/test_data/images #原始影像

+ 提供模型名称清单
+ 在test.py里内置.mat转.png的函数（参见 public_html\static\img\mat2png.py ）
# - 解除最后一行注释，跟`IMG_158.mat`一起上传ftp，运行并debug
+ 《修改模型-后端部分》在test.py内选择
# - 方法1：parser.add_argument
# - 方法2：os.getenv('SELECTED_MODEL')

+ 最终debug
+ 测试product版后端，查收成品

  ========== 中期修改 ==========
+ 程序补丁：print真实结果
# - 每行数据中添加 `GROUNDTRUTH` 和 `NUMBER`
```

### Flask and Frontend Missions (Thisoe)
```diff
+ 测试页: 测试`render_template`(CSS,JS,和后端变量发送到前端)
+ 查找Flask是否动态渲染——持续接受后端数据以及前后端互动性问题
+ 双页面切换用jQuery在前端虚拟连接（下记为前提）
+ 前端布局图代码化
+ jQuery建立SSE接口 `EventSource`
+ 联络以确认数据类型
+ 建立后端SSE接口
+ 找"conda activate " "source activate "问题原因和解决方案
+ 等待讨论决定：结果：test&train仅允许运行一次
+ 测试数据推流全过程

+ 按照会议决定修改“?2”页前端
+ “?1” 页：用推流来的数据将.mat文件实时添加到左栏；
# - stream()内寻找data含有 ["xxx"]  的部分，提取xxx +".mat"
+ （等待）单击.mat文件显示对应两种图片

+ 联络以询问"模型甲乙丙丁"（#p1 <select>）的后端逻辑需求=

+ 最终debug
+ ?p2添加执行按钮
+ 修改serv.py为product，上交成品
# - 删掉 `app.run` 的 `debug=True`

  ========== 中期修改 ==========
+ 显示真实结果数据和柱状图

  ========== 后期修改 ==========
+ 实例迁移后，左栏数据不跟进显示问题
```
