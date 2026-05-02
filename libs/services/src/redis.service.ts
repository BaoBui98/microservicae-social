import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisClient } from '@common/constant';

@Injectable()
export class RedisService {
    constructor(
        @Inject(RedisClient.REDIS_CLIENT) private readonly redisClient: Redis,
    ) { }

    async get<T>(key: string): Promise<T | null> {
        const data = await this.redisClient.get(key);
        if (!data) return null;
        try {
            return JSON.parse(data) as T;
        } catch {
            return data as unknown as T;
        }
    }

    async set<T>(key: string, value: T, ttlInSeconds = 300): Promise<void> {
        const data = typeof value === 'object' ? JSON.stringify(value) : String(value);
        await this.redisClient.set(key, data, 'EX', ttlInSeconds);
    }

    async delete(key: string): Promise<void> {
        await this.redisClient.del(key);
    }
}
