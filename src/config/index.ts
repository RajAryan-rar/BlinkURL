// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number,
    MONGO_URI: string,
    REDIS_URL: string,
    REDIS_COUNTER_KEY: string,
    BASE_URL: string
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 7777,
    MONGO_URI: process.env.MONGO_URI || "",
    REDIS_URL: process.env.REDIS_URL || "",
    REDIS_COUNTER_KEY: process.env.REDIS_COUNTER_KEY || "",
    BASE_URL: process.env.BASE_URL || "http://localhost:3000"
};