## Backend Launching 启动后端的流程

1. Login to AutoDL tunneling tool.
```bat
ssh ...
::pw...
2000
```
2. Connect SSH, run commands below.
```bash
cd public_html
chmod +x proxy_in_instance
./proxy_in_instance
python3 serv.py
```

3. Open `localhost:2000/client/` for test result.