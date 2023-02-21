import { createClient,  RedisClientType, RedisClientOptions } from 'redis';
import * as dotenv from 'dotenv';
dotenv.config();

// client vs pool?

const redisClient: RedisClientType = createClient({
    url: process.env.REDIS_URL,
    legacyMode: true
});

redisClient.connect().catch(console.error)

export default redisClient