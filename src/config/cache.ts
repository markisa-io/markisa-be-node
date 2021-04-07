/**
 * Provide connection to cache (in this case Redis)
 */
import Redis from "ioredis";
import logger from "../config/logger";
import dataConfig from "./dataconfig";

const client = new Redis({
  port: 6379, // Redis port
  host: dataConfig.REDIS_URL, // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: dataConfig.REDIS_PASS,
  db: 7,
});

const MAX_CACHE_RETRY_ATTEMPTS: number = 20;
let cacheConnectionAttempts: number = 0;

/**
 * Log when cache is connected
 */
client.on("connect", () => {
  logger.info(`Redis Cache connected`);
  cacheConnectionAttempts = 0; // reset
});

/**
 * Error handler for Redis cache
 */
client.on("error", (cacheError) => {
  if (cacheConnectionAttempts >= MAX_CACHE_RETRY_ATTEMPTS) {
    logger.error(`Could not connect to cache after ${cacheConnectionAttempts} attempts. Killing process.`);
    process.exit(1);
  }
  logger.error(`Error connecting to cache`);
  logger.error(cacheError.message);
  cacheConnectionAttempts ++;
});

export default client;
