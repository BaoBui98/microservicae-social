import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport, RmqOptions } from '@nestjs/microservices';
import { IsOptional, IsString, validateSync } from 'class-validator';

export class RabbitMQEnvironmentVariables {
    @IsString()
    @IsOptional()
    RABBITMQ_URL?: string;

    constructor(configService: ConfigService) {
        this.RABBITMQ_URL = configService.get<string>('RABBITMQ_URL');

        const errors = validateSync(this, {
            skipMissingProperties: false,
        });

        if (errors.length > 0) {
            throw new Error(`RabbitMQ config validation error: ${errors.toString()}`);
        }
    }
}

export const getRabbitMQConfig = (configService: ConfigService, queue: string): RmqOptions => {
    const env = new RabbitMQEnvironmentVariables(configService);

    return {
        transport: Transport.RMQ,
        options: {
            urls: [env.RABBITMQ_URL || 'amqp://social-app:social-app@localhost:5672'],
            queue,
            queueOptions: {
                durable: false,
            },
        },
    };
};

export const registerRabbitMQ = (name: string, queue: string) => {
    return {
        name,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => getRabbitMQConfig(configService, queue),
    };
};

