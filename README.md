<h1>Flask驱动的树木密度监测程序的GUI全栈服务器</h1>
<hr>

# 目录
- **[服务器使用说明（英文）](#documentation)**
  - [启动服务器的流程](#backend-launching)
- **[开发团队任务书](#开发团队任务书)**
  - [本repo使用须知](#github使用须知)
  - [待办事项兼工作日志](#todo-list--roadmap)



<br>

# Documentation

## Backend Launching

1. Open an SSH, create tunnel at port `2000`.
```bash
cd /public_html
chmod +x proxy_in_instance
./proxy_in_instance
```

2. Open another SSH, run Flask app.
```bash
cd /public_html
python serv.py
```

3. Login to _AutoDL_ tunneling tool.
```bat
ssh ...
::<password>
2000
```

4. Visit [`localhost:2000/client?0`](http://localhost:2000/client?0) for test result.



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

### Mission for Teammates 你的作业（
```diff
+ 平面设计前端布局
+ 在`serv.py`里`def`一个读取程序输出的数据的函数
! 按版本区别更新ftp, 按[流程](#backend-launching-启动后端的流程)跑测试页
-

```

### Thisoe's memo
```diff
+ 测试页: 测试`render_template`(CSS,JS)和后端变量发送到前端 <span
+ 查找Flask是否动态渲染——持续接受后端数据以及前后端互动性问题
! 双页面切换用jQuery在前端虚拟连接（下记为前提）
! 前端布局图代码化
- jQuery建立SSE接口 `EventSource`
# 联络teammates以确认数据类型
- 建立后端SSE接口
-

```


