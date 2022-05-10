# PACMON HTTP SERVER
## A simple http server for luxtronik2 heatpump

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

From there you should able to reach `http://localhost:8080`