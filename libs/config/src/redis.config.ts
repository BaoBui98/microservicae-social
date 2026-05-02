import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsNumber, IsOptional, IsString, validateSync } from 'class-validator';
import Redis from 'ioredis';
import { RedisClient } from '@common/constant';
export class RedisEnvironmentVariables {
    @IsString()
    REDIS_HOST!: string;

    @IsNumber()
    REDIS_PORT!: number;

    @IsString()
    @IsOptional()
    REDIS_PASSWORD?: string;

    constructor(configService: ConfigService) {
        this.REDIS_HOST = configService.get<string>('REDIS_HOST') || 'localhost';
        this.REDIS_PORT = Number(configService.get<number>('REDIS_PORT') || 6379);
        this.REDIS_PASSWORD = configService.get<string>('REDIS_PASSWORD');

        const errors = validateSync(this, {
            skipMissingProperties: false,
        });

        if (errors.length > 0) {
            throw new Error(`Redis config validation error: ${errors.toString()}`);
        }
    }
}

export const getRedisConfig = (configService: ConfigService) => {
    const env = new RedisEnvironmentVariables(configService);

    return {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD,
    };
};



export const registerRedis = () => {
    return {
        provide: RedisClient.REDIS_CLIENT,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            const config = getRedisConfig(configService);
            return new Redis({
                host: config.host,
                port: config.port,
                password: config.password || undefined,
            });
        },
    };
};
