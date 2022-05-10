import express, {Express} from 'express';
import http from "http";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// @ts-ignore
import luxtronik from "luxtronik2";

dotenv.config();

const port: number = parseInt(process.env.SERVER_PORT || '3000', 10);
const hostIp: string = process.env.HOST_IP || '127.0.0.1';
const hostPort: number = parseInt(process.env.HOST_PORT || '8888', 10);

const app: Express = express();
const server: http.Server = http.createServer(app);

app.use(bodyParser.json())

const pump = new luxtronik.createConnection(hostIp, hostPort);

app.get( "/", ( req, res ) => {
    pump.read((err: any, data: any) => {
        if (err) {
            return res.status(500).json({err})
        }

        return res.status(200).json({
            data: data,
            errors: data.values.errors
        });
    });
} );

server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
});