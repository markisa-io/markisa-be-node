import { Client } from "elasticsearch";
import logger from "./logger";
import dataConfig from "./dataconfig";

// const options: {[key: string]: any} = {
//   host: process.env.ES_HOST || "http://128.199.161.176:9200/",
//   log: process.env.ES_LOG_LEVEL || "info",
// };
const options: {[key: string]: any} = {
  host: dataConfig.ES_HOST,
  log: dataConfig.ES_LOG_LEVEL,
};

logger.info(`Connecting to document database at host: ${options.host}`);
const client  = new Client(options);

export default client;
