import express, {Express} from 'express';
import http from "http";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import luxtronik from "luxtronik2";

dotenv.config();

const port: number = parseInt(process.env.SERVER_PORT || '3000', 10);
const hostIp: string = process.env.HOST_IP || '127.0.0.1';
const hostPort: number = parseInt(process.env.HOST_PORT || '8888', 10);

const app: Express = express();
const server: http.Server = http.createServer(app);

const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

const pump = new luxtronik.createConnection(hostIp, hostPort);

// Get the current status of the pump
app.get( "/", ( req, res ) => {
    pump.read((err: any, data: any) => {
        if (err) return res.status(500).json({err});

        return res.status(200).json({
            data: data,
            errors: data.values.errors
        });
    });
});

// Set the heating temperature
app.post( "/heating-temperature", ( req, res, next ) => {
    const {offset_temperature} = req.body;

    // Check if offset_temperature is set
    if (offset_temperature === undefined || offset_temperature === null) return res.status(400).json({
        status: 'error',
        msg: 'Bad request, offset_temperature is missing'
    });

    // Check if offset_temperature is in range (-5 to 5)
    if (offset_temperature < -5 || offset_temperature > 5) return res.status(400).json({
        status: 'error',
        msg: 'Bad request, offset_temperature is out of range (-5 to 5)'
    });

    pump.write('heating_target_temperature', offset_temperature, (err: any, result: any) => {
        if (err) return res.status(500).json({err});

        return res.status(200).json({
            result
        });
    });
});

server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
});
