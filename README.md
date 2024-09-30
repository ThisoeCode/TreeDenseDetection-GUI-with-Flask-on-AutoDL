# TODO List & Roadmap 待办事项兼工作日志

## Mission for Teammates 你的作业）
- [x] 在`serv.py`里`def`一个读取程序输出的数据的函数
- [ ] 按版本区别更新ftp, 按[流程](#backend-launching-启动后端的流程)跑测试页

## Thisoe's memo
- [x] 测试页: 测试`render_template`(CSS,JS)和后端变量发送到前端
- [ ] 双页面切换用jQuery在前端虚拟连接（下记为前提）
  - [ ] 查找Flask是否动态渲染——持续接受后端数据以及前后端互动性问题
- [ ] ...



<br>

# Backend Launching 启动后端的流程

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

4. Visit [`localhost:2000/client`](http://localhost:2000/client) for test result.



<br>

# Git教程

- 查看版本区别时，忽略`README.md`和`.gitignore`文件。
- 