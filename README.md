<h1>Flask驱动的树木密度监测程序的GUI全栈服务器</h1>
<hr>

# 目录

> 快捷跳转：
> [作业](#mission-for-teammates-作业)
> [TODO](#thisoes-memo)

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
  - 函数必需一个参数：图片编号`id`（如`536`）；
  - 函数需返回`"GT_IMG_" + id + ".mat"`对应的路径辞典，辞典中包含`origin`（原始影像的路径）和`predict`（预测结果图片的路径），例如：
    return {
      "origin": "data.jpg",
      "predict": "pre.jpg"
    }
! 注：预测结果图片输出在 root/public_html/img/ 文件夹下。
+ 提供“模型运行”页以及“训练模型”页触发的`.py`文件相对路径

- 需将"test.py"和"train.py"内的所有`print()`添加param:`flush=True`。见例：
  print('Hello world', flush=True)
  （是为了向前端建立实时推流时捕获print内容）

# 请决定：每次开机是否只允许test.py和train.py运行一次，若不是：
  ? 将"test.py"和"train.py"末尾，一切执行结束时`print('ENDSTREAM', flush=True)`
  （作为前端的推流终止旗标）

- 测试`public_html\static\img\mat2png.py`
  - 解除最后一行注释，跟`IMG_158.mat`一起上传ftp，运行并debug
  - 输出的png在哪？是同文件夹下吗

```

### Thisoe's memo
```diff
+ 测试页: 测试`render_template`(CSS,JS,和后端变量发送到前端)
+ 查找Flask是否动态渲染——持续接受后端数据以及前后端互动性问题
+ 双页面切换用jQuery在前端虚拟连接（下记为前提）
! 前端布局图代码化
+ jQuery建立SSE接口 `EventSource`
+ 联络以确认数据类型
! 建立后端SSE接口
+ 联络以询问"模型甲乙丙丁"（#p1 <select>）的后端逻辑需求
# 等待决定：若test&train需运行多次，使用`threading.Lock()`并`global process`（记得在顶层`process = None`）
- 测试数据推流全过程
- 将'?1'页左栏那样的文件名列在一个array中。
  - 例：
    mat_list = ['IMG_158.mat','IMG_167.mat','IMG_233.mat']
-


```


