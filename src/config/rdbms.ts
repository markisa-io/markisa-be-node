import { ConnectionOptions } from "typeorm";
import dataConfig from "./dataconfig";

/**
 * Uses env params to configure TypeORM database library
 */
const config: ConnectionOptions = {
  database: dataConfig.POSTGRES_DB,
  entities: [
    __dirname + "/../**/*.entity{.ts,.js}",
  ],
  extra: { max: 5, min: 2 }, // connection pool
  host: dataConfig.POSTGRES_HOST,
  password: dataConfig.POSTGRES_PASSWORD,
  port: Number(dataConfig.POSTGRES_PORT),
  synchronize: true,
  type: "postgres",
  username: dataConfig.POSTGRES_USER,
};

export default config;
