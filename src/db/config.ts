/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * created: [2024-04-19]
 * Project: Pariahra
 */

import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { entities } from "../entityManager";

dotenv.config();

export const AppDataSource= new DataSource({
  type: "mssql",
  host: String(process.env.PRO_DB_HOST),
  port: Number(process.env.PRO_DB_PORT),
  username: process.env.PRO_DB_USERNAME,
  password: process.env.PRO_DB_PASSWORD,
  database: process.env.PRO_DB_DATABASE,
  entities: entities(),
  logging: false,
  synchronize: true,
  options: {
      encrypt: true,
      trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 3000
  }
});




