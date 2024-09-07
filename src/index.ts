/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * created: [2024-04-19]
 * Project: Pariahra
 */

import "reflect-metadata";
import express from 'express';
import morgan from 'morgan';
import fs from "fs";
import cors from "cors";
import { AppDataSource } from './db/config';
import Logger from './loggers/winstonLogger';
import compression from "compression";
//controllers
import { userRouter, adminRouter } from "./apiController";

// express adding sever to app
const app = express();

// setting port num from env
const port: any = process.env.PORT || 3000;

// using for body parsers
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(compression()); // for response in low sizes

// cors setup for communication of sever and client
app.use(
  cors({
    origin: ["http://parihara3.karnataka.gov.in", "https://parihara3.karnataka.gov.in", "http://103.138.197.135", "http://localhost:5173"]
  }
  ));

//setting req headers and res headers 
app.use(function (req, res, next) {
  res.header("X-XSS-Protection", "1; mode=block'");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("strict-transport-security", "max-age=63072000; includeSubdomains; preload");
  res.setHeader('X-Frame-Options', 'DENY');
  res.removeHeader('X-Powered-By');
  // Set Content-Security-Policy header to restrict embedding and other policies
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self'; default-src 'self'; script-src 'self'; style-src 'self';");

  next();
});

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// create for logs śad
app.use(morgan('common', {
  stream: fs.createWriteStream('./logs/application.log', { flags: 'a' })
}));

app.use(morgan('dev'));

app.get("/api/run", (req, res) => {
  res.send("running")
})

// controllers
app.use('/api/mobile', userRouter);
app.use('/api/admin', adminRouter);

// db initialization while running the server 
AppDataSource.initialize().then(async (connection) => {
  app.listen(port, () => {
    Logger.info(`⚡️[Database]: Database connected....+++++++ ${port}`);
  });
}).catch(error => {
  Logger.error("connection error :::::::", error);
  throw new Error("new Connection ERROR " + JSON.stringify(error));
})


