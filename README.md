# PACMON HTTP SERVER
## A simple http server for luxtronik2 heatpump
This project use the library `luxtronik2` to fetch data from heatpump and serve the result as json with a http server.
I use this project for my own smart home dashboard.

## Install and start
```shell
git clone git@github.com:Gulivertx/pacmon-http-server.git
cd pacmon-http-server
yarn install
```

Then create and edit an `.env` file
```dotenv
SERVER_PORT=8080
HOST_IP=HEATPUMP_IP_ADDRESS
HOST_PORT=8889
```

Build and start the server
```shell
yarn build
yarn start
```

From there you should able to reach `http://localhost:8080`.

If you run this project on a linux server using systemd, you should use it to handle this service as a service.
Here is an example of a systemd file to auto start the server.
```
Description=Start Pacmon HTTP Server
After=network.target

[Service]
Type=simple
ExecStart=/CHANGE_THIS_BY_FULL_PATH_OF_YARN/yarn start
WorkingDirectory=/CHANGE_THIS_BY_FULL_PATH_OF_PROJECT/pac-http-server/
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=Pacmon HTTP Server
User=CHANGE_THIS_BY_USERNAME
Group=CHANGE_THIS_BY_GROUP
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Then load and launch the script
```shell
sudo systemctl load pacmon.service
sudo systemctl start pacmon.service
```