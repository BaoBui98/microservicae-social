import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class TypeOrmEnvironmentVariables {
    @IsString()
    DB_HOST!: string;

    @IsNumber()
    DB_PORT!: number;

    @IsString()
    DB_USER!: string;

    @IsString()
    DB_PASSWORD!: string;

    @IsString()
    DB_NAME!: string;

    constructor(configService: ConfigService) {
        this.DB_HOST = configService.get<string>('DB_HOST') as string;
        this.DB_PORT = Number(configService.get<number>('DB_PORT'));
        this.DB_USER = configService.get<string>('DB_USER') as string;
        this.DB_PASSWORD = configService.get<string>('DB_PASSWORD') as string;
        this.DB_NAME = configService.get<string>('DB_NAME') as string;

        const errors = validateSync(this, {
            skipMissingProperties: false,
        });

        if (errors.length > 0) {
            throw new Error(`TypeORM config validation error: ${errors.toString()}`);
        }
    }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const env = new TypeOrmEnvironmentVariables(configService);

        return {
            type: 'postgres',
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USER,
            password: env.DB_PASSWORD,
            database: env.DB_NAME,
            synchronize: false,
            autoLoadEntities: true,
        };
    },
};
